#!/bin/bash
# Monitor the 300-cycle experiment progress

echo "📊 Monitoring 300-Cycle Experiment Progress"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

while true; do
    if [ -f "experiment-state.json" ]; then
        CURRENT=$(node -e "const s=require('./experiment-state.json'); console.log(s.currentCycle || 0)")
        TOTAL=$(node -e "const s=require('./experiment-state.json'); console.log(s.totalCycles || 300)")
        IMPROVEMENTS=$(node -e "const s=require('./experiment-state.json'); console.log((s.improvements || []).length)")
        ERRORS=$(node -e "const s=require('./experiment-state.json'); console.log((s.errors || []).length)")
        
        PERCENT=$((CURRENT * 100 / TOTAL))
        
        echo "[$(date +'%H:%M:%S')] Cycle $CURRENT/$TOTAL ($PERCENT%) | Improvements: $IMPROVEMENTS | Errors: $ERRORS"
        
        if [ "$CURRENT" -ge "$TOTAL" ]; then
            echo ""
            echo "✅ Experiment completed! Analyzing results..."
            node analyze-experiment-results.mjs
            break
        fi
    else
        echo "⏳ Waiting for experiment to start..."
    fi
    
    sleep 60  # Check every minute
done

