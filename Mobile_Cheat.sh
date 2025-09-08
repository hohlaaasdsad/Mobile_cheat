#!/data/data/com.termux/files/usr/bin/bash
# Mobile Blood Strike Cheat for Android

CONFIG_DIR="/data/data/com.termux/files/home/.bloodstrike_mobile"
LOG_FILE="$CONFIG_DIR/cheat.log"

# Colors for mobile
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m'

# Create directory
mkdir -p "$CONFIG_DIR"

# Mobile-specific features
enable_mobile_aim() {
    echo -e "${GREEN}[+] Включаю мобильный аим-ассистент...${NC}"
    echo "touch_sensitivity=95" > "$CONFIG_DIR/mobile_aim.cfg"
    echo "auto_rotation=1" >> "$CONFIG_DIR/mobile_aim.cfg"
    echo "assist_strength=80" >> "$CONFIG_DIR/mobile_aim.cfg"
    echo "1" > "$CONFIG_DIR/aim_active"
    echo "$(date) - Mobile aim activated" >> "$LOG_FILE"
}

enable_mobile_esp() {
    echo -e "${GREEN}[+] Включаю мобильный ESP...${NC}"
    echo "minimap_hack=1" > "$CONFIG_DIR/mobile_esp.cfg"
    echo "player_arrows=1" >> "$CONFIG_DIR/mobile_esp.cfg"
    echo "distance_display=1" >> "$CONFIG_DIR/mobile_esp.cfg"
    echo "1" > "$CONFIG_DIR/esp_active"
    echo "$(date) - Mobile ESP activated" >> "$LOG_FILE"
}

enable_no_recoil() {
    echo -e "${GREEN}[+] Включаю анти-отдачу...${NC}"
    echo "recoil_reduction=90" > "$CONFIG_DIR/norecoil.cfg"
    echo "shake_reduction=1" >> "$CONFIG_DIR/norecoil.cfg"
    echo "1" > "$CONFIG_DIR/norecoil_active"
    echo "$(date) - No recoil activated" >> "$LOG_FILE"
}

enable_rapid_fire() {
    echo -e "${GREEN}[+] Включаю rapid fire...${NC}"
    echo "fire_delay=50" > "$CONFIG_DIR/rapidfire.cfg"
    echo "auto_tap=1" >> "$CONFIG_DIR/rapidfire.cfg"
    echo "1" > "$CONFIG_DIR/rapidfire_active"
    echo "$(date) - Rapid fire activated" >> "$LOG_FILE"
}

# Status check
check_status() {
    echo -e "${YELLOW}=== МОБИЛЬНЫЙ СТАТУС ===${NC}"
    
    features=("aim" "esp" "norecoil" "rapidfire")
    for feature in "${features[@]}"; do
        if [ -f "$CONFIG_DIR/${feature}_active" ]; then
            echo -e "${GREEN}✅ ${feature} - АКТИВЕН${NC}"
        else
            echo -e "${RED}❌ ${feature} - ВЫКЛ${NC}"
        fi
    done
}

# Simple mobile menu
show_menu() {
    clear
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}   BLOOD STRIKE MOBILE CHEAT${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
    check_status
    echo ""
    echo -e "${GREEN}1. 🎯 Мобильный аим${NC}"
    echo -e "${GREEN}2. 👁️ Мобильный ESP${NC}"
    echo -e "${GREEN}3. ⚡ Анти-отдача${NC}"
    echo -e "${GREEN}4. 🔥 Rapid Fire${NC}"
    echo -e "${RED}5. 🔴 Выключить все${NC}"
    echo -e "6. 🚪 Выход"
    echo ""
    echo -n "Выбери: "
}

# Main loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            if [ -f "$CONFIG_DIR/aim_active" ]; then
                rm -f "$CONFIG_DIR/aim_active"
                echo -e "${RED}Аим выключен${NC}"
            else
                enable_mobile_aim
            fi
            ;;
        2)
            if [ -f "$CONFIG_DIR/esp_active" ]; then
                rm -f "$CONFIG_DIR/esp_active"
                echo -e "${RED}ESP выключен${NC}"
            else
                enable_mobile_esp
            fi
            ;;
        3)
            if [ -f "$CONFIG_DIR/norecoil_active" ]; then
                rm -f "$CONFIG_DIR/norecoil_active"
                echo -e "${RED}Анти-отдача выключена${NC}"
            else
                enable_no_recoil
            fi
            ;;
        4)
            if [ -f "$CONFIG_DIR/rapidfire_active" ]; then
                rm -f "$CONFIG_DIR/rapidfire_active"
                echo -e "${RED}Rapid fire выключен${NC}"
            else
                enable_rapid_fire
            fi
            ;;
        5)
            rm -f "$CONFIG_DIR"/*_active
            echo -e "${RED}Все функции выключены${NC}"
            ;;
        6)
            echo -e "${YELLOW}Выход...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Неверный выбор!${NC}"
            ;;
    esac
    
    echo ""
    echo -n "Нажми Enter... "
    read
done
