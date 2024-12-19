# Expensify CLI

The **Expensify CLI** is a powerful command-line tool that helps you manage your expenses, create reports, and keep track of your finances. With this tool, you can add, edit, delete transactions, and generate reports on the percentage distribution of expenses by category.

---

## **Contents**

1. [Installation](#installation)
2. [Usage](#usage)
   - [Add a Transaction](#add-a-transaction)
   - [View Transactions](#view-transactions)
   - [Edit a Transaction](#edit-a-transaction)
   - [Delete a Transaction](#delete-a-transaction)
   - [Generate a Report](#generate-a-report)
   - [View All Categories](#view-all-categories)
   - [Set Configuration Options](#set-configuration-options)
3. [Examples](#examples)
4. [Error Handling](#error-handling)
5. [License](#license)

---

## **Installation**

Make sure **Node.js** is installed on your system.

1. Install the package globally:

   ```bash
   npm install -g expensify-cli
   pnpm add -g expensify-cli
   ```

2. After installation, you can use the `exp` command.

---

## **Usage**

### **Help Command**

To view help for all available commands:

```bash
exp --help
```

---

### **1. Add a Transaction**

Add a new transaction:

```bash
exp add <category> <description> <amount> <date>
```

**Parameters:**

- `<category>`: The category of the expense.
- `<description>`: A description of the transaction.
- `<amount>`: The amount spent (accepts decimals with either `,` or `.`).
- `[date]`: The date of the transaction in the format `DD.MM.YYYY` (optional, defaults to today).

**Example:**

```bash
exp add "Household & Living" "Monthly household budget" 800.00 18.12.2024
```

---

### **2. View Transactions**

List all stored transactions:

```bash
exp list
```

**Optional Filters:**

- **`--category` or `-c`**: Filter transactions by category.
- **`--date` or `-d`**: Filter transactions by a specific date.
- **`--show-ids` or `-id`**: Display the IDs of the transactions.
- **`--descending` or `-desc`**: Change the sort order (descending by date).

**Example:**

```bash
exp list --category "Leisure"
exp list --date 18.12.2024
exp list --show-ids
exp list --descending
```

---

### **3. Edit a Transaction**

Edit a transaction by its ID:

```bash
exp edit <id> [options]
```

**Options:**

- **`-d, --date <date>`**: Change the date.
- **`-c, --category <category>`**: Change the category.
- **`-a, --amount <amount>`**: Change the amount.
- **`-desc, --description <description>`**: Change the description.

**Example:**

```bash
exp edit 1 --date 19.12.2024 --amount 750.00
```

---

### **4. Delete a Transaction**

Delete a transaction by its ID:

```bash
exp remove <id>
```

**Example:**

```bash
exp remove 2
```

---

### **5. Generate a Report**

Generate a report showing the percentage distribution of transactions by category:

```bash
exp report
```

**Optional Filters:**

- **`--month` or `-m`**: Generate a report for a specific month (format `YYYY-MM`).

**Example:**

```bash
exp report
exp report --month 2024-12
```

---

### **6. View All Categories**

List all available categories:

```bash
exp categories
```

**Example:**

```bash
exp categories
```

---

### **7. Set Configuration Options**

Update CLI settings, such as the active currency or language:

**Set Active Currency:**

```bash
exp config --set-currency <currency>
```

- `<currency>`: Specify the currency code (e.g., USD, EUR).

**Set Language:**

```bash
exp config --set-language <language>
```

- `<language>`: Specify the language code (e.g., en_001, de).

**View Configuration:**

```bash
exp config --view
```

**Example:**

```bash
exp config --set-currency USD
exp config --set-language en_001
exp config --view
```

---

## **Examples**

1. **Add Transactions:**

   ```bash
   exp add "Leisure" "Theatre visit" 35.90 15.12.2024
   exp add "Household & Living" "Monthly household budget" 800.00 18.12.2024
   ```

2. **List All Transactions:**

   ```bash
   exp list
   ```

3. **Edit a Transaction:**

   ```bash
   exp edit 1 --amount 750.00
   ```

4. **Delete a Transaction:**

   ```bash
   exp remove 2
   ```

5. **Generate a Report:**

   ```bash
   exp report --month 2024-12
   ```

6. **View All Categories:**

   ```bash
   exp categories
   ```

7. **Update Configuration:**
   ```bash
   exp config --set-currency EUR
   exp config --set-language de
   exp config --view
   ```

---

## **Error Handling**

1. **Invalid Date Format**:

   - Dates must be entered in the format `DD.MM.YYYY` for transactions or `YYYY-MM` for reports.

2. **Invalid Amount**:

   - Amounts must be valid numbers (e.g., `800.00` or `800,00`).

3. **ID Not Found**:

   - Ensure the transaction ID is correct when using `edit` or `remove`.

4. **Unsupported Language or Currency**:
   - Check the supported language or currency codes when updating the configuration.

---

## **License**

This project is licensed under the **MIT License**. For more details, refer to the [LICENSE file](./LICENSE).

---

Enjoy managing your expenses! 😊  
If you have any questions or issues, please create an [**issue** on GitHub](https://github.com/bickelmeister/expensify-cli/issues).
