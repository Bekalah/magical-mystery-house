# ⊙ Reports And Status - reports-and-status

**Alchemical Correspondence:**
- Element: N/A
- Planet: N/A
- Metal: N/A
- Symbol: ⊙

---

# ⊙ Cathedral Master Deployment - cathedral-master-deployment

**Alchemical Correspondence:**
- Element: N/A
- Planet: N/A
- Metal: N/A
- Symbol: ⊙

---

# ⊙ Cathedral Master Deployment - cathedral-master-deployment

**Alchemical Correspondence:**
- Element: N/A
- Planet: N/A
- Metal: N/A
- Symbol: ⊙

---

# Detailed Comparison Report System

**Status**: Running Continuously  
**Update Frequency**: Every 3 minutes  
**Reports**: Markdown + JSON

---

## Generated Reports

### `DETAILED_COMPARISON_REPORT.md`
Comprehensive markdown report with:
- Complete round summaries
- Detailed comparisons between rounds
- All packages/tools/engines worked on
- All learnings and insights
- Similarities and differences
- Unique items per round

### `detailed-comparison-report.json`
Complete JSON data with:
- All round data
- All comparisons
- All learnings categorized
- Complete package/tool/engine lists
- Unique items by round

---

## What's Compared

### Round Summaries
For each round:
- Cycles run and intervals
- Total improvements
- Packages worked on
- Tools worked on
- Engines worked on
- Systems scanned
- Connections established
- All learnings
- All insights about you
- All insights about your work

### Round Comparisons
**Round 1 vs Round 2:**
- Differences (cycles, improvements, connections)
- New packages/tools/engines in Round 2
- Common packages/tools/engines
- New learnings in Round 2
- New insights about you in Round 2
- New insights about your work in Round 2

**Round 2 vs Round 3:**
- Same detailed comparison

**Overall:**
- Total across all rounds
- All packages/tools/engines
- Items worked on in ALL rounds

### Unique Items
- Packages unique to each round
- Tools unique to each round
- Engines unique to each round

### All Learnings
- Technical learnings (all rounds)
- Insights about you (all rounds)
- Insights about your work (all rounds)

---

## View Reports

```bash
# View markdown report
cat DETAILED_COMPARISON_REPORT.md

# View JSON report
cat detailed-comparison-report.json | jq

# Watch updates
tail -f comparison-report.log

# Check specific comparison
cat detailed-comparison-report.json | jq '.comparisons.round1_vs_round2'

# Check unique items
cat detailed-comparison-report.json | jq '.packages.unique'
```

---

## Report Sections

1. **Round Summaries** - Complete details for each round
2. **Round Comparisons** - Detailed differences and similarities
3. **Overall Summary** - Complete picture across all rounds
4. **Unique Items** - What's unique to each round
5. **All Learnings** - Complete collection of all learnings and insights

---

*Reports update automatically every 3 minutes as rounds progress.*

