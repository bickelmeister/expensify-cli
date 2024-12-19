# **Expensify CLI**

**Expensify CLI** ist ein leistungsstarkes Kommandozeilen-Tool, das dir dabei hilft, deine Ausgaben zu verwalten, Berichte zu erstellen und deine Finanzen im Blick zu behalten. Mit diesem Tool kannst du Transaktionen hinzufügen, bearbeiten, löschen und Berichte zur prozentualen Verteilung der Ausgaben nach Kategorien erstellen.

---

## **Inhalt**

1. [Installation](#installation)
2. [Verwendung](#verwendung)
   - [Hinzufügen einer Transaktion](#hinzufügen-einer-transaktion)
   - [Anzeigen von Transaktionen](#anzeigen-von-transaktionen)
   - [Bearbeiten einer Transaktion](#bearbeiten-einer-transaktion)
   - [Löschen einer Transaktion](#löschen-einer-transaktion)
   - [Erstellen eines Berichts](#erstellen-eines-berichts)
   - [Anzeigen aller Kategorien](#anzeigen-aller-kategorien)
3. [Beispiele](#beispiele)
4. [Fehlerbehandlung](#fehlerbehandlung)
5. [Lizenz](#lizenz)

---

## **Installation**

Stelle sicher, dass du **Node.js** installiert hast.

1. Installiere das Paket global:

   ```bash
   npm install -g expensify-cli

   pnpm add -g expensify-cli
   ```

2. Nach der Installation steht dir der Befehl `exp` zur Verfügung.

---

## **Verwendung**

### **Hilfe anzeigen**

Um die Hilfe für alle verfügbaren Befehle anzuzeigen:

```bash
exp --help
```

### **1. Hinzufügen einer Transaktion**

Füge eine neue Transaktion hinzu:

```bash
exp add <category> <description> <amount> <date>
```

**Parameter:**

- `<category>`: Kategorie der Ausgabe.
- `<description>`: Beschreibung der Transaktion.
- `<amount>`: Betrag der Ausgabe (Dezimalzahlen mit `,` oder `.` erlaubt).
- `[date]`: Datum der Transaktion im Format `DD.MM.YYYY(optional, default ist Heute)`.

**Beispiel:**

```bash
exp add "Haushalt & Wohnen" "Monatliches Haushaltsbudget" 800,00 18.12.2024
```

---

### **2. Anzeigen von Transaktionen**

Liste alle gespeicherten Transaktionen auf:

```bash
exp list
```

**Optionale Filter:**

- **`--category` oder `-c`**: Filtere Transaktionen nach einer Kategorie.
- **`--date` oder `-d`**: Filtere Transaktionen nach einem bestimmten Datum.
- **`--show-ids` oder `-id`**: Zeige zusätzlich die IDs der Transaktionen an.
- **`--descending` oder `-desc`**: Ändert die Sortierreihenfolge (nach Datum absteigen)

**Beispiel:**

```bash
exp list --category "Freizeit"
exp list --date 18.12.2024
exp list --show-ids
exp list --descending
```

---

### **3. Bearbeiten einer Transaktion**

Bearbeite eine Transaktion anhand ihrer ID:

```bash
exp edit <id> [options]
```

**Optionen:**

- **`-d, --date <date>`**: Ändere das Datum.
- **`-c, --category <category>`**: Ändere die Kategorie.
- **`-a, --amount <amount>`**: Ändere den Betrag.
- **`-desc, --description <description>`**: Ändere die Beschreibung.

**Beispiel:**

```bash
exp edit 1 --date 19.12.2024 --amount 750.00
```

---

### **4. Löschen einer Transaktion**

Lösche eine Transaktion anhand ihrer ID:

```bash
exp remove <id>
```

**Beispiel:**

```bash
exp remove 2
```

---

### **5. Erstellen eines Berichts**

Erstelle einen Bericht zur prozentualen Verteilung der Transaktionen nach Kategorie:

```bash
exp report
```

**Optionale Filter:**

- **`--month` oder `-m`**: Erstelle den Bericht für einen bestimmten Monat (Format `YYYY-MM`).

**Beispiel:**

```bash
exp report
exp report --month 2024-12
```

---

### **6. Anzeigen aller Kategorien**

Zeige alle vorhandenen Kategorien an:

```bash
exp categories
```

**Beispiel:**

```bash
exp categories
```

---

## **Beispiele**

1. **Transaktionen hinzufügen:**

   ```bash
   exp add 18.12.2024 "Haushalt & Wohnen" "Monatliches Haushaltsbudget" 800,00
   exp add 15.12.2024 "Freizeit" "Theaterbesuch" 35.90
   ```

2. **Liste aller Transaktionen anzeigen:**

   ```bash
   exp list
   ```

3. **Bearbeiten einer Transaktion:**

   ```bash
   exp edit 1 --amount 750.00
   ```

4. **Transaktion löschen:**

   ```bash
   exp remove 2
   ```

5. **Bericht erstellen:**

   ```bash
   exp report --month 2024-12
   ```

6. **Kategorien anzeigen:**
   ```bash
   exp categories
   ```

---

## **Fehlerbehandlung**

1. **Ungültiges Datumsformat**:

   - Das Datum muss im Format `DD.MM.YYYY` für Transaktionen oder `YYYY-MM` für Berichte eingegeben werden.

2. **Ungültiger Betrag**:

   - Der Betrag muss eine gültige Zahl sein (z. B. `800,00` oder `800.00`).

3. **ID nicht gefunden**:
   - Stelle sicher, dass die Transaktions-ID korrekt ist, wenn du `edit` oder `remove` verwendest.

---

## **Lizenz**

Dieses Projekt steht unter der **MIT-Lizenz**. Weitere Informationen findest du in der [LICENSE-Datei](./LICENSE).

---

Viel Spaß beim Verwalten deiner Ausgaben! 😊  
Wenn du Fragen oder Probleme hast, erstelle ein [**Issue** auf GitHub](https://github.com/bickelmeister/expensify-cli/issues)!
