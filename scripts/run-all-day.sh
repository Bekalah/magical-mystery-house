#!/bin/bash
# @author Rebecca Respawn
# @license CC0-1.0 - Public Domain
#
# Run improvement experiment all day
# Keeps running continuously, auto-restarts on failure

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
EXPERIMENT_SCRIPT="$SCRIPT_DIR/10-hour-improvement-experiment.ts"
LOG_FILE="$BASE_DIR/experiment-all-day.log"
PID_FILE="$BASE_DIR/experiment-all-day.pid"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🚀 Starting Cathedral Improvement Experiment - All Day Mode"
echo "============================================================"
echo ""

# Check if already running
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Experiment already running (PID: $OLD_PID)${NC}"
        echo "   To restart, stop it first: kill $OLD_PID"
        exit 1
    else
        echo -e "${YELLOW}⚠️  Stale PID file found, removing...${NC}"
        rm -f "$PID_FILE"
    fi
fi

# Function to run experiment
run_experiment() {
    local cycle_count=0
    local max_cycles=1000  # Run for many cycles (effectively all day)
    
    echo -e "${GREEN}✅ Starting experiment loop...${NC}"
    echo "   Log file: $LOG_FILE"
    echo "   PID file: $PID_FILE"
    echo ""
    
    while [ $cycle_count -lt $max_cycles ]; do
        cycle_count=$((cycle_count + 1))
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting experiment cycle $cycle_count" >> "$LOG_FILE"
        echo -e "${GREEN}[Cycle $cycle_count]${NC} Starting experiment..."
        
        # Run experiment (will run for 10 hours = 240 cycles)
        # Use tsx if available, otherwise try to build and use node
        if command -v tsx &> /dev/null; then
            tsx "$EXPERIMENT_SCRIPT" >> "$LOG_FILE" 2>&1 || {
                echo -e "${RED}❌ Experiment failed in cycle $cycle_count${NC}"
                echo "[$(date '+%Y-%m-%d %H:%M:%S')] Experiment failed, will retry in 60 seconds" >> "$LOG_FILE"
                sleep 60
                continue
            }
        else
            # Try to build first
            echo "📦 Building TypeScript..." >> "$LOG_FILE"
            cd "$BASE_DIR"
            pnpm run build >> "$LOG_FILE" 2>&1 || {
                echo -e "${RED}❌ Build failed${NC}"
                sleep 60
                continue
            }
            
            # Run with node (if built)
            node dist/scripts/10-hour-improvement-experiment.js >> "$LOG_FILE" 2>&1 || {
                echo -e "${RED}❌ Experiment failed in cycle $cycle_count${NC}"
                echo "[$(date '+%Y-%m-%d %H:%M:%S')] Experiment failed, will retry in 60 seconds" >> "$LOG_FILE"
                sleep 60
                continue
            }
        fi
        
        echo -e "${GREEN}✅ Cycle $cycle_count completed${NC}"
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cycle $cycle_count completed successfully" >> "$LOG_FILE"
        
        # Wait a bit before next cycle (optional - experiment already runs for 10 hours)
        # Uncomment if you want a gap between 10-hour runs:
        # sleep 300  # 5 minutes between runs
    done
    
    echo -e "${GREEN}✅ Completed all cycles${NC}"
}

# Trap to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}⚠️  Received shutdown signal, cleaning up...${NC}"
    rm -f "$PID_FILE"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Experiment stopped" >> "$LOG_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Save PID
echo $$ > "$PID_FILE"
echo -e "${GREEN}✅ PID saved: $$${NC}"

# Change to base directory
cd "$BASE_DIR"

# Run experiment
run_experiment

# Cleanup
rm -f "$PID_FILE"
echo -e "${GREEN}✅ Experiment finished${NC}"

