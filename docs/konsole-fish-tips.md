# Konsole + Fish + CachyOS Tips & Tricks

## Konsole Keyboard Shortcuts

### Tabs
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+T` | New tab |
| `Ctrl+Shift+W` | Close tab |
| `Ctrl+PgUp/PgDown` | Switch tabs |
| `Ctrl+Shift+Left/Right` | Move tab |
| `Alt+1-9` | Jump to tab 1-9 |

### Splits
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+(` | Split horizontal |
| `Ctrl+Shift+)` | Split vertical |
| `Ctrl+Shift+E` | Expand/shrink split |
| `Ctrl+Tab` | Switch between splits |

### General
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+N` | New window |
| `Ctrl+Shift+C` | Copy |
| `Ctrl+Shift+V` | Paste |
| `Ctrl+Shift+F` | Find in output |
| `Ctrl+Shift+K` | Clear terminal |
| `Ctrl+Shift+S` | Rename tab |
| `Shift+PgUp/PgDown` | Scroll output |
| `Ctrl+Shift+M` | Toggle menu bar |

---

## Fish Shell

### Navigation & History
| Command/Shortcut | Action |
|------------------|--------|
| `Alt+Left/Right` | Jump word |
| `Ctrl+A/E` | Start/end of line |
| `Ctrl+W` | Delete word backward |
| `Alt+D` | Delete word forward |
| `Ctrl+R` | Search history |
| `Alt+Up/Down` | Previous/next argument |
| `Alt+.` | Insert last argument from previous command |
| `prevd` / `nextd` | Navigate directory history |
| `dirh` | Show directory history |
| `cdh` | Interactive directory history |

### Useful Built-ins
```fish
# List all functions
functions

# See function definition
functions <name>

# List abbreviations
abbr

# List variables
set

# Command duration (last command)
echo $CMD_DURATION

# Exit status of last command
echo $status
```

### Abbreviations (better than aliases)
```fish
# Add abbreviation (expands as you type)
abbr -a gs "git status"
abbr -a gc "git commit"
abbr -a gp "git push"
abbr -a ll "ls -la"
abbr -a .. "cd .."
abbr -a ... "cd ../.."

# List all
abbr

# Remove
abbr -e gs
```

### Functions
```fish
# Create and save function
function mkcd --description "Create dir and cd into it"
    mkdir -p $argv[1] && cd $argv[1]
end
funcsave mkcd

# One-liner to create + save
fish -c 'function name; command; end; funcsave name'

# Where functions are stored
ls ~/.config/fish/functions/

# Edit a function
funced <name>
```

### Fish Config
```fish
# Main config file
~/.config/fish/config.fish

# Functions directory
~/.config/fish/functions/

# Completions directory (custom tab completions)
~/.config/fish/completions/

# Reload config
source ~/.config/fish/config.fish

# Or just run
exec fish
```

### Useful Plugins (via Fisher)
```fish
# Install Fisher (plugin manager)
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher

# Popular plugins
fisher install PatrickF1/fzf.fish       # Fuzzy finder integration
fisher install jethrokuan/z            # Jump to frecent directories
fisher install jorgebucaran/autopair.fish  # Auto-close brackets
fisher install meaningful-ooo/sponge   # Remove failed commands from history
```

---

## Workflow Automation

### Open Work Repo with Tabs
```fish
# Add to config.fish or save as function
function work --description "Open work terminal with tabs"
    set repo ~/path/to/your/work/repo
    konsole --workdir $repo \
        --new-tab -p tabtitle="editor" \
        --new-tab -p tabtitle="server" \
        --new-tab -p tabtitle="tests"
end
funcsave work
```

### Run Command in New Tab
```fish
function newtab --description "Open command in new Konsole tab"
    konsole --new-tab -e fish -c "$argv; exec fish"
end
funcsave newtab

# Usage
newtab "npm run dev"
```

### Project Switcher
```fish
function proj --description "Jump to project and open in editor"
    set projects ~/Documents/code
    set selected (find $projects -maxdepth 2 -type d -name ".git" | xargs dirname | fzf)
    if test -n "$selected"
        cd $selected
        code .  # or your editor
    end
end
funcsave proj
```

### Quick Scratchpad
```fish
function scratch --description "Open temp file in editor"
    set tmpfile (mktemp /tmp/scratch.XXXXXX)
    $EDITOR $tmpfile
end
```

---

## Konsole Sessions

### Save Current Layout
1. Set up tabs how you want them
2. `File → Save Layout As...`
3. Save to `~/.local/share/konsole/mysetup.konsole`

### Restore Session
```bash
konsole --tabs-from-file ~/.local/share/konsole/mysetup.konsole
```

### Create Session File Manually
```ini
# ~/.local/share/konsole/work.konsole
[Tab 0]
title=editor
workdir=/home/user/project

[Tab 1]
title=server
workdir=/home/user/project
command=npm run dev

[Tab 2]
title=tests
workdir=/home/user/project
```

---

## Konsole Profiles

Profiles let you have different appearances/behaviors for different contexts.

1. `Settings → Manage Profiles → New`
2. Set:
   - Name: "Work", "Server", "SSH", etc.
   - Colors: Different scheme per profile
   - Font: Different size if needed
   - Initial directory
   - Command: (optional) run something on start

### Open Tab with Specific Profile
```bash
konsole --new-tab -p "Profile=Work"
```

---

## CachyOS Specific

### Package Management (paru)
```fish
# CachyOS uses paru as AUR helper
paru -S <package>        # Install
paru -Syu                # Update all
paru -R <package>        # Remove
paru -Ss <query>         # Search
paru -Qi <package>       # Info about installed package

# Abbreviations
abbr -a p "paru"
abbr -a pup "paru -Syu"
abbr -a pin "paru -S"
abbr -a prm "paru -R"
```

### Systemd Shortcuts
```fish
abbr -a sc "sudo systemctl"
abbr -a scu "systemctl --user"
abbr -a jc "journalctl -xe"
abbr -a jcf "journalctl -f"  # Follow logs
```

### CachyOS Settings
- **CachyOS Hello**: Quick system setup
- **CachyOS Kernel Manager**: Switch between kernel variants
- **Cachyos-rate-mirrors**: Optimize mirror list

---

## Integration: fzf + fish + Konsole

If you install `fzf.fish` plugin, you get:

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+F` | Search files |
| `Ctrl+Alt+L` | Search git log |
| `Ctrl+Alt+S` | Search git status |
| `Ctrl+Alt+P` | Search processes |
| `Ctrl+R` | Search history (enhanced) |

---

## Quick Reference Card

```
TABS:           Ctrl+Shift+T (new) | Ctrl+PgUp/Down (switch) | Alt+1-9 (jump)
SPLITS:         Ctrl+Shift+( or ) | Ctrl+Tab (switch)
HISTORY:        Ctrl+R (search) | Alt+. (last arg) | Alt+Up/Down (prev args)
DIRS:           cdh (history) | prevd/nextd (back/forward)
COPY/PASTE:     Ctrl+Shift+C/V
FIND:           Ctrl+Shift+F
CLEAR:          Ctrl+Shift+K (konsole) | Ctrl+L (shell)
```

---

## My Recommended Setup

```fish
# ~/.config/fish/config.fish

# Abbreviations
abbr -a g "git"
abbr -a gs "git status"
abbr -a gc "git commit"
abbr -a gp "git push"
abbr -a gpl "git pull"
abbr -a gd "git diff"
abbr -a ga "git add"
abbr -a ll "ls -la"
abbr -a .. "cd .."
abbr -a ... "cd ../.."
abbr -a p "paru"
abbr -a c "code ."

# Functions
function mkcd
    mkdir -p $argv[1] && cd $argv[1]
end

function work
    set repo ~/path/to/work
    cd $repo
    konsole --new-tab -p tabtitle="server" --new-tab -p tabtitle="tests" &
end
```
