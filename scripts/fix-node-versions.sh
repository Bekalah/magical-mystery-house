#!/bin/bash

# Fix Node.js version consistency across all packages
# Standardizes engine versions to >=20.18.0 for consistency

echo "🔧 Fixing Node.js version consistency across all packages..."
echo ""

# Target consistent engine versions
TARGET_NODE_VERSION=">=20.18.0"
TARGET_PNPM_VERSION=">=8.15.0"

# Find all package.json files in packages directory
PACKAGE_DIRS=$(find packages -name "package.json" -type f)

UPDATED=0

for package_json in $PACKAGE_DIRS; do
    # Create a temporary file with updated content
    temp_file=$(mktemp)
    
    # Update engines section
    if grep -q '"engines"' "$package_json"; then
        # File already has engines, update them
        awk -v node_ver="$TARGET_NODE_VERSION" -v pnpm_ver="$TARGET_PNPM_VERSION" '
        /"engines"/ {
            getline
            gsub(/"node": "[^"]*"/, "\"node\": \"" node_ver "\"", $0)
            gsub(/"pnpm": "[^"]*"/, "\"pnpm\": \"" pnpm_ver "\"", $0)
            if (!/pnpm/) {
                gsub(/}/, ",", $0)
                print $0
                print "    \"pnpm\": \"" pnpm_ver "\""
                getline
            }
        }
        { print }
        ' "$package_json" > "$temp_file"
    else
        # No engines section, add it
        awk -v node_ver="$TARGET_NODE_VERSION" -v pnpm_ver="$TARGET_PNPM_VERSION" '
        /}/ && !engines_added {
            if (NR > 1) {
                prev_line = getline next_line
                print next_line
            }
            print "  \"engines\": {"
            print "    \"node\": \"" node_ver "\","
            print "    \"pnpm\": \"" pnpm_ver "\""
            print "  },"
            engines_added = 1
        }
        { print }
        ' "$package_json" > "$temp_file"
    fi
    
    # Check if content changed
    if ! diff -q "$package_json" "$temp_file" > /dev/null; then
        cp "$temp_file" "$package_json"
        package_name=$(basename $(dirname "$package_json"))
        echo "✅ Updated $package_name"
        UPDATED=$((UPDATED + 1))
    else
        package_name=$(basename $(dirname "$package_json"))
        echo "⏭️  Skipped $package_name (already consistent)"
    fi
    
    rm "$temp_file"
done

echo ""
echo "🎉 Successfully updated $UPDATED package(s)"
echo "📊 All packages now use Node.js $TARGET_NODE_VERSION"