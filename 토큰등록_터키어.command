#!/bin/bash
# 복사해 둔 토큰(클립보드)을 터키어 계정 시크릿으로 등록
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
if pbpaste | gh secret set IG_ACCESS_TOKEN_TR -R skytravelover-ship-it/kore-news-cards; then
  echo ""; echo "✅ 등록 완료! 이 창은 닫으셔도 됩니다."
else
  echo ""; echo "❌ 실패. Meta 화면에서 토큰을 다시 복사한 뒤 이 파일을 다시 더블클릭하세요."
fi
