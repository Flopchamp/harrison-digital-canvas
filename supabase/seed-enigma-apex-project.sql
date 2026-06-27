-- Project: ENIGMA APEX — Professional Prop Firm Trading Assistant
-- Run this in your Supabase SQL Editor to add this project

INSERT INTO public.projects (
  title,
  description,
  long_description,
  tech_stack,
  featured,
  display_order,
  demo_url,
  github_url,
  image_url
) VALUES (
  'ENIGMA APEX',
  'A professional prop-firm trading assistant — "training wheels for prop traders". Monitors real-time compliance for Apex, FTMO, TopStep, and MyFundedFX, reads AlgoBox signals via OCR, applies Kelly Criterion position sizing, and delivers AI first-principles guidance across a 6-chart Streamlit dashboard.',
  $desc$
## Overview

ENIGMA APEX wraps a trader''s existing AlgoBox Enigma algorithm with a full professional enhancement layer: real-time compliance monitoring, OCR-based signal detection, statistical position sizing, and AI-guided trade analysis — all from a single Streamlit dashboard.

**Live Demo:** [enigma-apex-professional-algo-trader.onrender.com](https://enigma-apex-professional-algo-trader.onrender.com/)

## What It Does

| Feature | Detail |
|---|---|
| Compliance monitoring | Real-time rule enforcement for Apex, FTMO, TopStep, MyFundedFX |
| Signal reading | OCR reads AlgoBox screen pixels — no API required |
| Position sizing | Kelly Criterion with minimum 30-trade statistical validity guard |
| Multi-chart dashboard | Up to 6 simultaneous NinjaTrader/Tradovate charts |
| AI guidance engine | First-principles trade analysis backed by SQLite trade history |
| WebSocket server | Real-time signal broadcast to dashboards and mobile clients |
| Emergency stop | Triggered automatically by drawdown breach or compliance violation |
| Credential security | Fernet encryption (PBKDF2HMAC) stored in OS keyring |

## Architecture

```
streamlit_app.py                  ← Primary Streamlit UI
enigma_config.py                  ← All tunable constants (Kelly cap, ATR multiples, OCR thresholds)
enigma_logging.py                 ← Rotating log file, configurable via LOG_LEVEL env var

system/
  advanced_risk_manager.py        ← SQLite risk metrics (drawdown, Kelly, Sharpe, win-rate)
  apex_compliance_guardian.py     ← Compliance monitor with ApexRules dataclass
  chatgpt_agent_integration.py    ← FirstPrinciplesAI + KellyOptimizationEngine
  enhanced_websocket_server.py    ← asyncio WebSocket broadcast server (port 8765)
  multi_chart_ocr_coordinator.py  ← Manages 6-chart OCR threads
  ocr_enigma_reader.py            ← HSV pixel masking + Tesseract OCR signal reader

prop_firm_compliance_engine.py    ← Table-driven rules for Apex + FTMO tiers
production_api_manager.py         ← Async Tradovate REST + WebSocket client
secure_credential_manager.py      ← Fernet-encrypted credential storage
```

## Key Data Flows

**Signal Detection**
`OCRSignalReader` captures the screen region, HSV-masks for red/yellow/green activation pixels, then runs Tesseract OCR on the power score — producing an `EnigmaSignal` dataclass.

**Multi-Chart Monitoring**
`MultiChartOCRCoordinator` spawns one thread per chart. Each thread calls `OCRSignalReader` and writes results to `self.last_signals[chart_id]`. The Streamlit UI polls this dict on refresh.

**Compliance Checking**
`PropFirmComplianceEngine.check_violations()` receives an `account_data` dict (daily P&L, balance, drawdown) and matches it against table-driven tier rules in `_APEX_TIERS` / `_FTMO_TIERS`. Returns a list of `ComplianceViolation` objects.

**AI Guidance**
`FirstPrinciplesAI` persists trade history in `ai_trading_analytics.db` (SQLite) and applies hardcoded rules using ATR multiples from `enigma_config.py`. Kelly Criterion sizing is only applied after a minimum of 30 trades for statistical validity.

## Tunable Constants (enigma_config.py)

| Constant | Default | Purpose |
|---|---|---|
| `KELLY_FRACTION_CAP` | 0.25 | Maximum Kelly fraction per trade |
| `ATR_STOP_LOSS_MULTIPLE` | 1.5 | Stop distance = ATR × this |
| `ATR_PROFIT_TARGET_MULTIPLE` | 2.0 | Target distance = ATR × this |
| `MIN_POWER_SCORE` | 15 | Minimum Enigma power score to enter a trade |
| `OCR_CONFIDENCE_THRESHOLD` | 60 | Minimum Tesseract confidence score |

## Prop Firm Support

Adding a new prop firm or account tier requires only adding a dict to `_APEX_TIERS` or `_FTMO_TIERS` — no method changes needed. Currently supports:

- **Apex Trader Funding** — full tier table
- **FTMO** — full tier table
- **TopStep** and **MyFundedFX** — compliance rule sets
  $desc$,
  ARRAY['Python', 'Streamlit', 'OpenCV', 'Tesseract OCR', 'SQLite', 'asyncio', 'WebSocket', 'Socket.IO', 'Fernet', 'NinjaTrader API'],
  true,
  3,
  'https://enigma-apex-professional-algo-trader.onrender.com/',
  'https://github.com/Flopchamp/ENIGMA_APEX_PROFESSIONAL_ALGO_TRADER',
  'https://harrisononyangoaloo.vercel.app/images/enigma-apex.png'
);

-- Verify the project was created
SELECT id, title, display_order, featured, demo_url FROM public.projects WHERE title = 'ENIGMA APEX';
