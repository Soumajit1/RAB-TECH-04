# Dynamic JavaScript DOM Logic & RESTful API Client

This repository implements a modular, vanilla ES6+ application that fetches real-time data from an external REST API (FakeStoreAPI) and manages client-side state without external libraries.

## Architecture & Implementation Details

*   **Modular Architecture**: Separates logic into `api.js` (network requests and endpoints) and `app.js` (DOM manipulation, state management, and event handling) using ES6 imports/exports.
*   **Asynchronous Data Fetching**: Utilizes `async/await` and the Fetch API (`fetchProducts`, `fetchCategories`). Multiple network requests are executed concurrently using `Promise.all` during initialization.
*   **Client-Side State Management**: Centralizes application state (products, search queries, active categories, and sort modes) in a standard JavaScript object. The DOM is derived predictably from this state.
*   **Performance & UX**:
    *   **Loading Skeletons**: CSS-animated skeletons are rendered immediately while awaiting network responses to prevent layout shifts.
    *   **DOM Updates**: Filtering and sorting are performed strictly in-memory (no page reloads).
    *   **Local Storage Sync**: Cart additions are synchronized synchronously to the browser's `localStorage` for cross-session persistence.
*   **Robust Error Handling**: Network failures are caught via `try/catch` blocks and presented to the user via a dismissible error banner component, rather than failing silently in the console.

## Usage
Since this uses ES6 modules (`<script type="module">`), you must serve it over a local web server (e.g., `python -m http.server`, VS Code Live Server) to bypass CORS/file-system protocol restrictions. Opening `index.html` directly via the `file://` protocol will result in a CORS module error.
https://www.youtube.com/watch?v=7Wi38uVsW98
https://www.youtube.com/watch?v=7Wi38uVsW98https://www.youtube.com/watch?v=7Wi38uVsW98https://www.youtube.com/watch?v=7Wi38uVsW98https://www.youtube.com/watch?v=7Wi38uVsW98
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:


/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
