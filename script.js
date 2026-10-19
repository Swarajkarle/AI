/**
 * AI Practical Code Viewer - Application Script
 * -------------------------------------------------------------
 * Responsive, vanilla JavaScript code viewer for AI practicals.
 * Ubuntu terminal / gedit inspired interface.
 * 
 * =============================================================
 * INSTRUCTIONS FOR ADDING YOUR PRACTICAL CODES:
 * Replace the empty string or text in the 'code' property for each
 * practical below. All spaces, indentation, newlines, comments,
 * and variable names will be preserved with 100% accuracy.
 * =============================================================
 */

// =============================================================================
// 1. DATA STRUCTURE: 8 AI PRACTICAL SLOTS (WAITING FOR ORIGINAL CODE)
// =============================================================================

const PRACTICALS_DATA = [
  {
    id: 1,
    title: "Practical 1: Simple Reflex Agent (Vacuum Cleaner)",
    description: "Design and implement a simple reflex agent for the Vacuum Cleaner world and analyze its rational behavior in a given environment.",
    language: "python",
    filename: "practical_1.py",
    code: `# Q.1. Design and implement a simple reflex agent for the Vacuum Cleaner world and analyze its rational behavior in a given environment.

# Create the environment
environment = {'A': 'Dirty', 'B': 'Dirty'}

# Set the initial location of the agent
location = 'A'

# Run until both rooms become clean
while True:
    # Display current status
    print("Current Location:", location)
    print("Environment:", environment)

    # Check goal state
    if environment['A'] == 'Clean' and environment['B'] == 'Clean':
        print("Goal achieved! Both rooms are clean.")
        break

    # Sense the current room
    if environment[location] == 'Dirty':
        # Clean the room
        print("Action: SUCK")
        environment[location] = 'Clean'
    else:
        # Move to the other room
        if location == 'A':
            print("Action: MOVE RIGHT")
            location = 'B'
        else:
            print("Action: MOVE LEFT")
            location = 'A'

    print("-" * 40)

# Rational Behaviour Analysis
print("\\nRational Behaviour Analysis")
print("1. Cleans a room immediately if dirty.")
print("2. Moves only when current room is already clean.")
print("3. Stops after both rooms are clean.")
print("Hence the agent behaves rationally for this environment.")`
  },
  {
    id: 2,
    title: "Practical 2: Model-Based Intelligent Agent",
    description: "Implement a model-based intelligent agent capable of navigating a grid environment with obstacles using internal state representation.",
    language: "python",
    filename: "practical_2.py",
    code: `# Q.2. Implement a model-based intelligent agent capable of navigating a grid environment with obstacles using internal state representation.

# ==========================================================
# MODEL-BASED INTELLIGENT AGENT FOR GRID NAVIGATION
# ==========================================================

# Grid Representation
# S = Start
# G = Goal
# X = Obstacle
# 0 = Free Cell

grid = [
    ['S', 0, 0],
    ['X', 0, 0],
    [0, 0, 'G']
]

# Initial Position
row = 0
col = 0

# Goal Position
goal = (2, 2)

# Internal State (Memory)
visited = []

print("Grid Navigation Begins\\n")

while True:
    # Store visited location
    if (row, col) not in visited:
        visited.append((row, col))

    print("Current Position :", (row, col))
    print("Visited Cells :", visited)

    # Check Goal
    if (row, col) == goal:
        print("\\nGoal Reached!")
        break

    moved = False

    # Move Right
    if col + 1 < 3 and grid[row][col + 1] != 'X' and (row, col + 1) not in visited:
        print("Action : Move Right")
        col += 1
        moved = True

    # Move Down
    elif row + 1 < 3 and grid[row + 1][col] != 'X' and (row + 1, col) not in visited:
        print("Action : Move Down")
        row += 1
        moved = True

    # Move Left
    elif col - 1 >= 0 and grid[row][col - 1] != 'X' and (row, col - 1) not in visited:
        print("Action : Move Left")
        col -= 1
        moved = True

    # Move Up
    elif row - 1 >= 0 and grid[row - 1][col] != 'X' and (row - 1, col) not in visited:
        print("Action : Move Up")
        row -= 1
        moved = True

    # No Valid Move
    if not moved:
        print("\\nNo valid move available.")
        break

    print("-" * 40)

print("\\nFinal Visited Cells :", visited)

print("\\nRational Behaviour Analysis")
print("1. The agent stores previously visited cells.")
print("2. It avoids obstacles while navigating.")
print("3. It does not revisit explored locations.")
print("4. It uses its internal memory to decide the next move.")
print("Hence, it behaves as a Model-Based Intelligent Agent.")`
  },
  {
    id: 3,
    title: "Practical 3: A* Search for 8 Puzzle Problem",
    description: "Implement A* Search for 8 Puzzle Problem using misplaced tiles heuristic.",
    language: "python",
    filename: "practical_3.py",
    code: `# Q.3. Implement A* Search for 8 Puzzle Problem

from copy import deepcopy

GOAL = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]


class Node:

    def __init__(self, state, parent=None, g=0):
        self.state = state
        self.parent = parent
        self.g = g  # Cost from start
        self.h = self.heuristic()  # Misplaced tiles
        self.f = self.g + self.h

    def heuristic(self):
        """Number of misplaced tiles (excluding blank)."""
        count = 0

        for i in range(3):
            for j in range(3):
                if self.state[i][j] != 0 and self.state[i][j] != GOAL[i][j]:
                    count += 1

        return count

    def __lt__(self, other):
        return self.f < other.f

    def get_blank(self):
        for i in range(3):
            for j in range(3):
                if self.state[i][j] == 0:
                    return i, j

    def generate_children(self):
        children = []
        x, y = self.get_blank()
        moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for dx, dy in moves:
            nx = x + dx
            ny = y + dy

            if 0 <= nx < 3 and 0 <= ny < 3:
                new_state = deepcopy(self.state)

                # Swap blank tile
                new_state[x][y], new_state[nx][ny] = (
                    new_state[nx][ny], new_state[x][y]
                )

                children.append(Node(new_state, self, self.g + 1))

        return children


def state_to_tuple(state):
    return tuple(tuple(row) for row in state)


def print_solution(node):
    path = []

    while node is not None:
        path.append(node)
        node = node.parent

    path.reverse()

    print("\\nSolution Path:\\n")

    for step, n in enumerate(path):
        print("Step:", step)

        for row in n.state:
            print(row)

        print("g =", n.g, " h =", n.h, " f =", n.f)
        print()


def a_star(initial_state):
    start = Node(initial_state)
    open_list = [start]
    closed_set = set()

    while open_list:
        open_list.sort(key=lambda x: x.f)
        current = open_list.pop(0)

        if current.state == GOAL:
            print("Goal Reached!")
            print("Total Moves =", current.g)
            print_solution(current)
            return

        closed_set.add(state_to_tuple(current.state))
        children = current.generate_children()

        for child in children:
            child_tuple = state_to_tuple(child.state)

            if child_tuple in closed_set:
                continue

            found = False

            for node in open_list:
                if node.state == child.state and node.f <= child.f:
                    found = True
                    break

            if not found:
                open_list.append(child)

    print("No Solution Found.")


initial_state = [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8]
]

print("Initial State:")

for row in initial_state:
    print(row)

a_star(initial_state)`
  },
  {
    id: 4,
    title: "Practical 4: Tower of Hanoi by State Space Search",
    description: "Implement Tower of Hanoi by State Space Search using Breadth-First Search (BFS).",
    language: "python",
    filename: "practical_4.py",
    code: `# Q.4. Implement Tower of Hanoi by State Space Search

from collections import deque


# Generate all possible valid moves
def get_neighbors(state):
    neighbors = []
    pegs = [list(peg) for peg in state]

    for i in range(3):
        if pegs[i]:
            disk = pegs[i][-1]

            for j in range(3):
                if i != j:
                    if not pegs[j] or pegs[j][-1] > disk:
                        new_pegs = [list(peg) for peg in pegs]
                        new_pegs[i].pop()
                        new_pegs[j].append(disk)

                        neighbors.append(
                            tuple(tuple(peg) for peg in new_pegs)
                        )

    return neighbors


def bfs_tower_of_hanoi(n):
    start = (tuple(range(n, 0, -1)), (), ())
    goal = ((), (), tuple(range(n, 0, -1)))

    queue = deque([start])
    visited = set([start])
    parent = {start: None}

    while queue:
        current = queue.popleft()

        if current == goal:
            break

        for neighbor in get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = current
                queue.append(neighbor)

    path = []
    state = goal

    while state is not None:
        path.append(state)
        state = parent[state]

    path.reverse()

    print("Solution found in", len(path) - 1, "moves:\\n")

    for step, state in enumerate(path):
        print(f"Step {step}:")
        print("A:", state[0])
        print("B:", state[1])
        print("C:", state[2])
        print()


n = 4
bfs_tower_of_hanoi(n)`
  },
  {
    id: 5,
    title: "Practical 5: BFS for Planning Problem - Blocks World",
    description: "Use BFS to Solve a Planning Problem in the Blocks World domain.",
    language: "python",
    filename: "practical_5.py",
    code: `# Q.5. Use BFS to Solve a Planning Problem - Blocks World

from collections import deque


# Generate all possible next states
def get_successors(state):
    """
    state = tuple of stacks
    Example:
    (('A', 'B', 'C'),) -> A is bottom, C is top
    """
    successors = []

    # Convert tuple to list for modification
    stacks = [list(stack) for stack in state]

    for i in range(len(stacks)):
        if not stacks[i]:
            continue

        # Take the top block from stack i
        block = stacks[i][-1]

        # Move it to every other stack
        for j in range(len(stacks)):
            if i == j:
                continue

            new_stacks = [s[:] for s in stacks]
            new_stacks[i].pop()
            new_stacks[j].append(block)

            # Remove empty stacks
            new_stacks = [tuple(s) for s in new_stacks if s]
            successors.append(tuple(new_stacks))

        # Move block to a new stack (table)
        new_stacks = [s[:] for s in stacks]
        new_stacks[i].pop()
        new_stacks.append([block])
        new_stacks = [tuple(s) for s in new_stacks if s]
        successors.append(tuple(new_stacks))

    return successors


# Breadth First Search
def bfs(start, goal):
    queue = deque()
    queue.append((start, []))

    visited = set()
    visited.add(start)

    while queue:
        current, path = queue.popleft()

        if current == goal:
            return path + [current]

        for nxt in get_successors(current):
            if nxt not in visited:
                visited.add(nxt)
                queue.append((nxt, path + [current]))

    return None


# Display state
def print_state(state):
    print("-" * 25)

    for i, stack in enumerate(state):
        print(f"Stack {i + 1}: {list(stack)}")

    print("-" * 25)


# Main Program

# Initial State:
# A on B on C
start = (('C', 'B', 'A'),)

# Goal State:
# C on B on A
goal = (('A', 'B', 'C'),)

solution = bfs(start, goal)

if solution:
    print("\\nSolution Found!\\n")

    for step, state in enumerate(solution):
        print(f"Step {step}")
        print_state(state)
else:
    print("No solution found.")`
  },
  {
    id: 6,
    title: "Practical 6: 8-Queens Problem (Backtracking CSP)",
    description: "Implement Backtracking Search to Solve the 8-Queens Constraint Satisfaction Problem.",
    language: "python",
    filename: "practical_6.py",
    code: `# Q.6. Implement Backtracking Search to Solve the 8-Queens Constraint Satisfaction Problem

# 8-Queens Problem using Backtracking (CSP)

N = 8


# Function to print the chessboard
def printSolution(board):
    print("\\nOne Possible Solution:\\n")

    for i in range(N):
        for j in range(N):
            if board[i][j] == 1:
                print("Q", end=" ")
            else:
                print(".", end=" ")
        print()


# Function to check whether a queen can be placed safely
def isSafe(board, row, col):
    # Check left side of current row
    for i in range(col):
        if board[row][i] == 1:
            return False

    # Check upper-left diagonal
    i = row
    j = col

    while i >= 0 and j >= 0:
        if board[i][j] == 1:
            return False
        i -= 1
        j -= 1

    # Check lower-left diagonal
    i = row
    j = col

    while i < N and j >= 0:
        if board[i][j] == 1:
            return False
        i += 1
        j -= 1

    return True


# Recursive function to solve the problem
def solveNQUtil(board, col):
    # Base Case: All queens are placed
    if col >= N:
        return True

    # Try placing queen in each row of the current column
    for i in range(N):
        if isSafe(board, i, col):
            # Place the queen
            board[i][col] = 1

            # Recur to place the rest of the queens
            if solveNQUtil(board, col + 1):
                return True

            # Backtrack
            board[i][col] = 0

    # If no queen can be placed in this column
    return False


# Main function
def solveNQ():
    # Create an empty 8 x 8 chessboard
    board = [[0 for _ in range(N)] for _ in range(N)]

    if not solveNQUtil(board, 0):
        print("Solution does not exist")
        return False

    printSolution(board)
    return True


# Driver Code
solveNQ()`
  },
  {
    id: 7,
    title: "Practical 7: Rule-Based Chatbot with Pattern Matching",
    description: "Develop a Simple Chatbot Using Predefined Rules and Pattern Matching.",
    language: "python",
    filename: "practical_7.py",
    code: `# Q.7. Develop a Simple Chatbot Using Predefined Rules and Pattern Matching.

import re


def get_response(user):
    user = user.lower()

    if re.search(r"\\b(hi|hello|hey)\\b", user):
        return "Hello! Welcome to Customer Support."

    elif re.search(r"order|track|tracking", user):
        return "Please enter your Order ID to track your order."

    elif re.search(r"return|replace|exchange", user):
        return "Returns are accepted within 7 days."

    elif re.search(r"refund", user):
        return "Refunds take 5–7 business days."

    elif re.search(r"cancel", user):
        return "Orders can only be cancelled before shipping."

    elif re.search(r"payment", user):
        return "We accept UPI, Cards and COD."

    elif re.search(r"delivery|shipping", user):
        return "Delivery usually takes 3–5 business days."

    elif re.search(r"contact", user):
        return "Email: support@company.com"

    elif re.search(r"\\b(bye|exit)\\b", user):
        return "Thank you! Have a nice day."

    else:
        return "Sorry, I couldn't understand your question."


# Main Program
print("=" * 45)
print("        Customer Support Chatbot")
print("Type 'bye' or 'exit' to end the chat.")
print("=" * 45)

while True:
    user_input = input("\\nYou: ")

    response = get_response(user_input)
    print("Bot:", response)

    if re.search(r"\\b(bye|exit)\\b", user_input.lower()):
        break`
  },
  {
    id: 8,
    title: "Practical 8: Minimax Algorithm for Game Playing Agent",
    description: "Develop a game-playing agent using the Minimax algorithm for optimal decision-making.",
    language: "python",
    filename: "practical_8.py",
    code: `# Q.8. Develop a game-playing agent using the Minimax algorithm for optimal decision-making.

import math

# Initialize board
board = [' ' for _ in range(9)]


# Display board
def print_board():
    print()

    for i in range(3):
        print(" " + board[i * 3] + " | " + board[i * 3 + 1] + " | " + board[i * 3 + 2])

        if i < 2:
            print("---|---|---")

    print()


# Check winner
def check_winner(player):
    win_positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for pos in win_positions:
        if all(board[i] == player for i in pos):
            return True

    return False


# Check draw
def is_draw():
    return ' ' not in board


# Minimax Algorithm
def minimax(is_max):
    if check_winner('O'):
        return 1

    if check_winner('X'):
        return -1

    if is_draw():
        return 0

    if is_max:
        best = -math.inf

        for i in range(9):
            if board[i] == ' ':
                board[i] = 'O'
                score = minimax(False)
                board[i] = ' '
                best = max(best, score)

        return best

    else:
        best = math.inf

        for i in range(9):
            if board[i] == ' ':
                board[i] = 'X'
                score = minimax(True)
                board[i] = ' '
                best = min(best, score)

        return best


# AI Move
def ai_move():
    best_score = -math.inf
    move = -1

    for i in range(9):
        if board[i] == ' ':
            board[i] = 'O'
            score = minimax(False)
            board[i] = ' '

            if score > best_score:
                best_score = score
                move = i

    board[move] = 'O'


# Human Move
def human_move():
    while True:
        try:
            pos = int(input("Enter position (1-9): ")) - 1

            if 0 <= pos < 9 and board[pos] == ' ':
                board[pos] = 'X'
                break
            else:
                print("Invalid move. Try again.")

        except ValueError:
            print("Enter a valid number.")


# Main Game
print("Positions are:")
print("1 | 2 | 3")
print("--|---|--")
print("4 | 5 | 6")
print("--|---|--")
print("7 | 8 | 9")

while True:
    print_board()

    human_move()

    if check_winner('X'):
        print_board()
        print("You Win!")
        break

    if is_draw():
        print_board()
        print("It's a Draw!")
        break

    ai_move()

    if check_winner('O'):
        print_board()
        print("AI Wins!")
        break

    if is_draw():
        print_board()
        print("It's a Draw!")
        break`
  }
];

// =============================================================================
// 2. APPLICATION STATE
// =============================================================================

let currentPracticalIndex = 0;
let filteredIndices = PRACTICALS_DATA.map((_, i) => i);
let toastTimeoutId = null;
let isCodeHidden = false;

// =============================================================================
// 3. DOM ELEMENT REFERENCES
// =============================================================================

const elements = {
  // Sidebar & Navigation
  practicalsList: document.getElementById('practicalsList'),
  sidebarCounter: document.getElementById('sidebarCounter'),
  badgeTotalPracticals: document.getElementById('badgeTotalPracticals'),
  mobileNavToggle: document.getElementById('mobileNavToggle'),

  // Header & Search
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  searchMeta: document.getElementById('searchMeta'),
  ubuntuClock: document.getElementById('ubuntuClock'),

  // Window Controls & Tabs
  ubuntuWindow: document.getElementById('ubuntuWindow'),
  winMaxBtn: document.getElementById('winMaxBtn'),
  toggleFullscreenBtn: document.getElementById('toggleFullscreenBtn'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  shortcutsBtn: document.getElementById('shortcutsBtn'),
  tabFileName: document.getElementById('tabFileName'),

  // Practical Metadata Bar
  currentNumBadge: document.getElementById('currentNumBadge'),
  currentProgCounter: document.getElementById('currentProgCounter'),
  currentTitle: document.getElementById('currentTitle'),
  currentDescription: document.getElementById('currentDescription'),

  // Navigation Buttons
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),

  // Action Buttons & Blackout Overlay
  fullBlackoutOverlay: document.getElementById('fullBlackoutOverlay'),
  copyCodeBtn: document.getElementById('copyCodeBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  hideAllCodesBtn: document.getElementById('hideAllCodesBtn'),

  // Code Display & Gutters
  lineNumbersGutter: document.getElementById('lineNumbersGutter'),
  codeBlock: document.getElementById('codeBlock'),
  codePre: document.getElementById('codePre'),
  codeViewport: document.getElementById('codeViewport'),

  // Status Bar
  statusLineCount: document.getElementById('statusLineCount'),
  statusCharCount: document.getElementById('statusCharCount'),
  statusFileName: document.getElementById('statusFileName'),

  // Toast & Shortcuts Modal
  copyToast: document.getElementById('copyToast'),
  toastMsg: document.getElementById('toastMsg'),
  shortcutsModal: document.getElementById('shortcutsModal'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  dialogOkBtn: document.getElementById('dialogOkBtn')
};

// =============================================================================
// 4. RENDERING FUNCTIONS
// =============================================================================

/**
 * Render the sidebar list of 8 practical slots
 */
function renderSidebarList() {
  elements.practicalsList.innerHTML = '';

  if (filteredIndices.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.style.padding = '16px';
    emptyState.style.textAlign = 'center';
    emptyState.style.color = 'var(--input-placeholder)';
    emptyState.style.fontSize = '12px';
    emptyState.textContent = 'No matching practicals found.';
    elements.practicalsList.appendChild(emptyState);
    return;
  }

  filteredIndices.forEach((dataIndex) => {
    const item = PRACTICALS_DATA[dataIndex];
    const button = document.createElement('button');
    button.className = `practical-item ${dataIndex === currentPracticalIndex ? 'active' : ''}`;
    button.setAttribute('role', 'listitem');
    button.setAttribute('data-index', dataIndex);
    button.setAttribute('id', `nav-practical-${item.id}`);

    button.innerHTML = `
      <div class="practical-item-top">
        <span class="practical-tag">Practical ${item.id}</span>
        <span class="practical-ext">${item.filename}</span>
      </div>
      <div class="practical-name">${escapeHtml(item.title)}</div>
      <div class="practical-desc-snip">${escapeHtml(item.description)}</div>
    `;

    button.addEventListener('click', () => {
      selectPractical(dataIndex);
      if (window.innerWidth <= 768 && elements.practicalsList) {
        elements.practicalsList.classList.add('collapsed');
      }
    });

    elements.practicalsList.appendChild(button);
  });
}

/**
 * Select and load a practical by index
 */
function selectPractical(index) {
  if (index < 0 || index >= PRACTICALS_DATA.length) return;
  
  exitBlackout();
  currentPracticalIndex = index;
  const current = PRACTICALS_DATA[index];

  // Update Window Tab
  elements.tabFileName.textContent = current.filename || `practical_${current.id}.py`;

  // Update Header Badges & Info
  elements.currentNumBadge.textContent = `Practical ${current.id}`;
  elements.currentProgCounter.textContent = `Practical ${current.id} of ${PRACTICALS_DATA.length}`;
  elements.currentTitle.textContent = current.title;
  elements.currentDescription.textContent = current.description;

  // Update Status Bar
  elements.statusFileName.textContent = current.filename || `practical_${current.id}.py`;

  // Render Code & Line Numbers
  renderCodeContent(current.code);

  // Update Active Item in Sidebar
  document.querySelectorAll('.practical-item').forEach((btn) => {
    const btnIndex = parseInt(btn.getAttribute('data-index'), 10);
    btn.classList.toggle('active', btnIndex === currentPracticalIndex);
  });

  // Update Previous / Next Navigation Controls
  elements.prevBtn.disabled = (currentPracticalIndex === 0);
  elements.nextBtn.disabled = (currentPracticalIndex === PRACTICALS_DATA.length - 1);

  // Reset scroll
  elements.codeViewport.scrollTop = 0;
  elements.codeViewport.scrollLeft = 0;
}

/**
 * Full page blackout: turns the whole screen completely pitch black
 */
function enterBlackout() {
  if (elements.fullBlackoutOverlay) {
    elements.fullBlackoutOverlay.classList.add('active');
  }
}

/**
 * Exit blackout: restores the page and code display
 */
function exitBlackout() {
  if (elements.fullBlackoutOverlay) {
    elements.fullBlackoutOverlay.classList.remove('active');
  }
}

/**
 * Render code with line numbers and syntax highlighting
 */
function renderCodeContent(rawCode) {
  const lines = rawCode.split('\n');
  const totalLines = lines.length;

  // Generate line numbers gutter
  let gutterHtml = '';
  for (let i = 1; i <= totalLines; i++) {
    gutterHtml += `<span class="line-number-cell">${i}</span>`;
  }
  elements.lineNumbersGutter.innerHTML = gutterHtml;

  // Set code content
  elements.codeBlock.textContent = rawCode;

  // Syntax highlighting
  if (window.Prism && Prism.languages.python) {
    elements.codeBlock.className = 'language-python';
    Prism.highlightElement(elements.codeBlock);
  }

  // Update Status Counts
  elements.statusLineCount.textContent = `Lines: ${totalLines}`;
  elements.statusCharCount.textContent = `Chars: ${rawCode.length}`;
}

// =============================================================================
// 5. COPY & DOWNLOAD FUNCTIONALITY
// =============================================================================

/**
 * Copy only the original code without line numbers
 */
async function copyCleanCode() {
  const current = PRACTICALS_DATA[currentPracticalIndex];
  const success = await copyToClipboard(current.code);
  if (success) {
    showToast('Code copied successfully');
  }
}

/**
 * Cross-browser clipboard helper
 */
async function copyToClipboard(textToCopy) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } else {
      // Fallback method
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    showToast('Failed to copy code to clipboard');
    return false;
  }
}

/**
 * Download selected code as a file
 */
function downloadCurrentCode() {
  const current = PRACTICALS_DATA[currentPracticalIndex];
  const filename = current.filename || `practical_${current.id}.py`;
  const blob = new Blob([current.code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Downloaded ${filename}`);
}

/**
 * Show temporary success message
 */
function showToast(message, duration = 3000) {
  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }
  elements.toastMsg.textContent = message;
  elements.copyToast.classList.add('active');

  toastTimeoutId = setTimeout(() => {
    elements.copyToast.classList.remove('active');
    toastTimeoutId = null;
  }, duration);
}

// =============================================================================
// 6. SEARCH & FILTERING
// =============================================================================

function handleSearch() {
  const query = elements.searchInput.value.trim().toLowerCase();

  if (query.length > 0) {
    elements.clearSearchBtn.classList.add('visible');
  } else {
    elements.clearSearchBtn.classList.remove('visible');
  }

  if (!query) {
    filteredIndices = PRACTICALS_DATA.map((_, i) => i);
    elements.searchMeta.textContent = '';
  } else {
    filteredIndices = PRACTICALS_DATA.reduce((acc, practical, idx) => {
      const matchNum = `${practical.id}` === query || `practical ${practical.id}`.includes(query);
      const matchTitle = practical.title.toLowerCase().includes(query);
      const matchDesc = practical.description.toLowerCase().includes(query);
      const matchCode = practical.code.toLowerCase().includes(query);

      if (matchNum || matchTitle || matchDesc || matchCode) {
        acc.push(idx);
      }
      return acc;
    }, []);

    elements.searchMeta.textContent = `Found ${filteredIndices.length} matching practical(s)`;
  }

  renderSidebarList();

  if (filteredIndices.length > 0 && !filteredIndices.includes(currentPracticalIndex)) {
    selectPractical(filteredIndices[0]);
  }
}

function clearSearch() {
  elements.searchInput.value = '';
  handleSearch();
  elements.searchInput.focus();
}

// =============================================================================
// 7. WINDOW ACTIONS & THEME
// =============================================================================

function toggleFullscreen() {
  elements.ubuntuWindow.classList.toggle('maximized');
}

function toggleTheme() {
  const isDark = document.body.classList.contains('theme-ubuntu-dark');
  if (isDark) {
    document.body.classList.remove('theme-ubuntu-dark');
    document.body.classList.add('theme-ubuntu-light');
    localStorage.setItem('ubuntu-theme', 'light');
    showToast('Switched to Light theme');
  } else {
    document.body.classList.remove('theme-ubuntu-light');
    document.body.classList.add('theme-ubuntu-dark');
    localStorage.setItem('ubuntu-theme', 'dark');
    showToast('Switched to Ubuntu Dark theme');
  }
}

function initTheme() {
  const saved = localStorage.getItem('ubuntu-theme');
  if (saved === 'light') {
    document.body.classList.remove('theme-ubuntu-dark');
    document.body.classList.add('theme-ubuntu-light');
  } else {
    document.body.classList.add('theme-ubuntu-dark');
  }
}

function updateUbuntuClock() {
  const now = new Date();
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  elements.ubuntuClock.textContent = now.toLocaleDateString('en-US', options).replace(',', '');
}

// =============================================================================
// 8. KEYBOARD SHORTCUTS MODAL
// =============================================================================

function openShortcutsModal() {
  elements.shortcutsModal.classList.add('active');
  elements.shortcutsModal.setAttribute('aria-hidden', 'false');
}

function closeShortcutsModal() {
  elements.shortcutsModal.classList.remove('active');
  elements.shortcutsModal.setAttribute('aria-hidden', 'true');
}

// =============================================================================
// 9. EVENT LISTENERS
// =============================================================================

function setupEventListeners() {
  // Previous & Next Navigation
  elements.prevBtn.addEventListener('click', () => {
    if (currentPracticalIndex > 0) {
      selectPractical(currentPracticalIndex - 1);
    }
  });

  elements.nextBtn.addEventListener('click', () => {
    if (currentPracticalIndex < PRACTICALS_DATA.length - 1) {
      selectPractical(currentPracticalIndex + 1);
    }
  });

  // Action Buttons
  elements.copyCodeBtn.addEventListener('click', copyCleanCode);
  elements.downloadBtn.addEventListener('click', downloadCurrentCode);
  if (elements.hideAllCodesBtn) {
    elements.hideAllCodesBtn.addEventListener('click', enterBlackout);
  }
  if (elements.fullBlackoutOverlay) {
    elements.fullBlackoutOverlay.addEventListener('click', exitBlackout);
  }

  // Search Input
  elements.searchInput.addEventListener('input', handleSearch);
  elements.clearSearchBtn.addEventListener('click', clearSearch);

  // Window Controls
  elements.winMaxBtn.addEventListener('click', toggleFullscreen);
  elements.toggleFullscreenBtn.addEventListener('click', toggleFullscreen);
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Mobile Nav Toggle
  if (elements.mobileNavToggle) {
    elements.mobileNavToggle.addEventListener('click', () => {
      elements.practicalsList.classList.toggle('collapsed');
    });
  }

  // Shortcuts Modal
  elements.shortcutsBtn.addEventListener('click', openShortcutsModal);
  elements.closeModalBtn.addEventListener('click', closeShortcutsModal);
  elements.dialogOkBtn.addEventListener('click', closeShortcutsModal);
  elements.shortcutsModal.addEventListener('click', (e) => {
    if (e.target === elements.shortcutsModal) {
      closeShortcutsModal();
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (e.key === 'Escape') {
      if (elements.shortcutsModal.classList.contains('active')) {
        closeShortcutsModal();
      } else if (elements.ubuntuWindow.classList.contains('maximized')) {
        elements.ubuntuWindow.classList.remove('maximized');
      }
      return;
    }

    if (isTyping) {
      if (e.key === 'Escape') {
        elements.searchInput.blur();
      }
      return;
    }

    // '/' or Ctrl+K to focus search
    if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
      return;
    }

    // Alt + C to copy code
    if (e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      copyCleanCode();
      return;
    }

    // If blackout is active, dismiss blackout on any key press
    if (elements.fullBlackoutOverlay && elements.fullBlackoutOverlay.classList.contains('active')) {
      if (e.key >= '1' && e.key <= '8') {
        exitBlackout();
        const targetIndex = parseInt(e.key, 10) - 1;
        if (targetIndex >= 0 && targetIndex < PRACTICALS_DATA.length) {
          selectPractical(targetIndex);
        }
        return;
      }
      exitBlackout();
      return;
    }

    // Alt + H to toggle blackout
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      if (elements.fullBlackoutOverlay && elements.fullBlackoutOverlay.classList.contains('active')) {
        exitBlackout();
      } else {
        enterBlackout();
      }
      return;
    }

    // Left Arrow: Previous practical
    if (e.key === 'ArrowLeft') {
      if (currentPracticalIndex > 0) {
        selectPractical(currentPracticalIndex - 1);
      }
      return;
    }

    // Right Arrow: Next practical
    if (e.key === 'ArrowRight') {
      if (currentPracticalIndex < PRACTICALS_DATA.length - 1) {
        selectPractical(currentPracticalIndex + 1);
      }
      return;
    }

    // Numbers 1 to 8: Direct select
    if (e.key >= '1' && e.key <= '8') {
      const targetIndex = parseInt(e.key, 10) - 1;
      if (targetIndex >= 0 && targetIndex < PRACTICALS_DATA.length) {
        selectPractical(targetIndex);
      }
    }
  });
}

// =============================================================================
// 10. UTILITIES
// =============================================================================

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =============================================================================
// 11. INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateUbuntuClock();
  setInterval(updateUbuntuClock, 10000);

  elements.badgeTotalPracticals.textContent = `${PRACTICALS_DATA.length} Practicals`;
  elements.sidebarCounter.textContent = `${PRACTICALS_DATA.length} Slots`;

  renderSidebarList();
  selectPractical(0);
  setupEventListeners();
});
