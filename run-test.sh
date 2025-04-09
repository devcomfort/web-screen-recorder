#!/bin/bash

# 종료 시 실행될 정리 함수 정의
cleanup() {
  # 자식 프로세스 모두 정리
  if [ ! -z "$PID" ]; then
    echo "테스트 환경 정리 중..."
    pkill -P $PID 2>/dev/null
    kill -15 $PID 2>/dev/null
    sleep 1
    # 여전히 실행 중이면 강제 종료
    if ps -p $PID > /dev/null; then
      kill -9 $PID 2>/dev/null
    fi
  fi
}

# 종료 시 cleanup 함수 실행
trap cleanup EXIT

# 이미 포트가 사용 중인지 확인하고 프로세스 종료 여부 확인
if command -v lsof >/dev/null 2>&1; then
  if lsof -i:5173 >/dev/null 2>&1; then
    echo "경고: 포트 5173이 이미 사용 중입니다."
    
    # 해당 프로세스 정보 표시
    echo "현재 포트 5173을 사용 중인 프로세스:"
    lsof -i:5173 -sTCP:LISTEN
    
    # 사용자에게 프로세스 종료 여부 확인 (기본값: No)
    read -p "이 프로세스를 종료하시겠습니까? [y/N] " response
    response=${response,,} # 소문자로 변환
    
    if [[ "$response" =~ ^(yes|y)$ ]]; then
      echo "프로세스를 종료합니다..."
      PID_TO_KILL=$(lsof -t -i:5173)
      kill -15 $PID_TO_KILL 2>/dev/null
      sleep 2
      
      # 여전히 실행 중인지 확인
      if lsof -i:5173 >/dev/null 2>&1; then
        echo "일반 종료가 실패했습니다. 강제 종료를 시도합니다..."
        kill -9 $PID_TO_KILL 2>/dev/null
        sleep 1
        
        # 최종 확인
        if lsof -i:5173 >/dev/null 2>&1; then
          echo "프로세스 종료에 실패했습니다. 테스트를 중단합니다."
          exit 1
        else
          echo "프로세스가 성공적으로 종료되었습니다."
        fi
      else
        echo "프로세스가 성공적으로 종료되었습니다."
      fi
    else
      echo "프로세스를 종료하지 않았습니다. 테스트를 중단합니다."
      exit 1
    fi
  fi
fi

# 테스트 환경 시작 - nohup과 disown을 사용하여 독립 프로세스로 실행
echo "테스트 환경 시작 중..."
cd test-environment
nohup pnpm dev > nohup.out 2>&1 &
PID=$!
disown $PID
cd ..

# 서버가 준비될 때까지 대기
echo "서버 시작 대기 중..."
for i in {1..30}; do
  if curl -s http://localhost:5173 >/dev/null 2>&1; then
    echo "서버가 준비되었습니다"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "서버 시작 시간 초과"
    exit 1
  fi
  sleep 0.5
done

# 테스트 실행
echo "테스트 실행 중..."
pnpm -F test-playwright test "$@"
TEST_STATUS=$?

# 테스트 상태 반환
exit $TEST_STATUS 