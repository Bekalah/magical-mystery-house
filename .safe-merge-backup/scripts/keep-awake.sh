#!/bin/bash
# Keep system awake for experiment duration
# Prevents sleep for 10 hours

DURATION=36000  # 10 hours in seconds

echo "🌙 Keeping system awake for experiment..."
echo "⏱️  Duration: 10 hours"

# Kill any existing caffeinate
pkill -f "caffeinate.*36000" 2>/dev/null

# Start caffeinate with all sleep prevention flags
caffeinate -d -i -m -s -u -t $DURATION &

CAFFEINATE_PID=$!
echo $CAFFEINATE_PID > caffeinate.pid

echo "✅ System will stay awake"
echo "📝 PID: $CAFFEINATE_PID"
echo ""
echo "To stop early: kill $CAFFEINATE_PID"

wait $CAFFEINATE_PID
echo "⏰ Sleep prevention ended after 10 hours"

