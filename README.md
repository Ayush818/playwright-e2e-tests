# 🚀 Playwright E2E Automation Suite

## 🧾 Project Overview

An end-to-end automation suite for validating the core workflows of an e-commerce platform using Playwright with TypeScript. The suite verifies authentication, inventory interactions, cart updates, checkout flow, and session handling, all through a scalable and maintainable Page Object Model (POM) architecture.

## 📦 Tech Stack

| Component      | Description                    |
| -------------- | ------------------------------ |
| Framework      | Playwright                     |
| Language       | TypeScript                     |
| Test Runner    | Playwright Test Runner         |
| Assertions     | Built-in Playwright assertions |
| Design Pattern | Page Object Model (POM)        |

---

## ✅ Features Covered & Test Design Techniques

### 1. ✅ Verify successful login with a valid user

- Verifies login page functionality and post-login redirection to inventory page.

### 2. ✅ Verify all inventory items are displayed after login

- Validates that all 6 expected items are visible with correct details.

### 3. ✅ Verify Add to Cart Functionality

- Verifies cart badge update, button label change, and state persistence.

### 4. ✅ Verify Remove from Cart Functionality

- Ensures removed items reflect in cart icon and cart content.

### 5. ✅ Verify Checkout Process

- Validates item flow from cart to checkout and final confirmation.

### 6. ✅ Validate Logout from Burger Menu

- Confirms redirection and session termination.

### 7. ✅ Navigate to product detail page and verify information

- Ensures correct navigation and rendering of product details.

### 8. ✅ Verify Back Button Behavior After Logout

- Prevents re-access of protected pages post logout.

### 9. ✅ Validate Cart Icon Count Updates Correctly

- Ensures cart badge reflects correct item count after add/remove.

---

## 🧠 SOLID Principles Applied

| Principle | Application in Code                                  |
| --------- | ---------------------------------------------------- |
| SRP       | Each Page Object class handles only its own concerns |
| OCP       | Easy to extend specs without changing core logic     |
| LSP       | Page Object methods follow predictable behavior      |
| ISP       | Test classes use only relevant selectors/actions     |
| DIP       | Tests rely on abstracted methods, not raw selectors  |

---

## 📐 Best Practices Followed

- ✅ Page Object Model: reusable, maintainable component-based structure
- ✅ No hardcoded waits: relies on Playwright’s auto-waiting
- ✅ No hardcoded URLs: uses `baseURL` from `playwright.config.ts`
- ✅ Reusable locators and functions
- ✅ Clear separation of test data, test logic, and assertions
- ✅ Test Design Techniques like Equivalence Partitioning, State Transitions

---

## ▶️ How to Run the Tests (From Scratch)

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🔧 Install Playwright browsers

```bash
npx playwright install
```

### 2. 🧪 Run all tests

```bash
npx playwright test
```

### 3. ⚙️ Run tests in parallel

```bash
npx playwright test --workers=5
```

## 🧰 Developer Documentation

### 🧱 Structure

- Each spec file targets one business workflow
- Each page object contains:
  - Locators (filtered for performance)
  - Actions (login, click, add, remove, etc.)
  - Assertions (expect validations)

### 💡 Adding a New Test

- Create a new .spec.ts file in tests/
- Add logic using Playwright’s test() block
- Use existing Page Object methods or extend them if needed

## 🔁 Reusability

- Page Objects promote code reuse
- Any change in UI selectors can be updated in one place
- Shared actions like login can be abstracted via `utils/`

## 🛠️ Troubleshooting

- Use `--debug` to trace steps:

```bash
npx playwright test --debug
```

## 🧰 Developer Documentation

```bash
├── fixtures/
│   ├── expectedInventory.json
│   └── test-data-fixture.ts
├── node_modules/
├── pages/
│   ├── BurgerMenuPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── Common.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── ProductDetailPage.ts
├── playwright-report/
├── test-results/
├── tests/
│   ├── add-to-cart.spec.ts
│   ├── backButtonLogout.spec.ts
│   ├── checkout-process.spec.ts
│   ├── inventory.spec.ts
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   ├── productDetail.spec.ts
│   ├── remove-from-cart.spec.ts
├── utils/
│   ├── selectors.ts
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── test-fixtures.ts
```

# 🎯 Summary

- 🔍 Follows best test design principles
- 🔄 Fully scalable using POM
- 🧪 Validates all critical workflows including login, cart, checkout, and logout
- 👨‍💻 Developer-friendly structure for rapid test creation and maintenance
- ✅ Ready-to-run instructions with parallel execution support
