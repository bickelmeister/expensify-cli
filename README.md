# **Balance CLI**

**Balance CLI** ist ein leistungsstarkes Kommandozeilen-Tool, das dir dabei hilft, deine Ausgaben zu verwalten, Berichte zu erstellen und deine Finanzen im Blick zu behalten. Mit diesem Tool kannst du Transaktionen hinzufügen, bearbeiten, löschen und Berichte zur prozentualen Verteilung der Ausgaben nach Kategorien erstellen.

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
   npm install -g balance

   pnpm add -g balance
   ```

2. Nach der Installation steht dir der Befehl `balance` zur Verfügung.

---

## **Verwendung**

### **Hilfe anzeigen**

Um die Hilfe für alle verfügbaren Befehle anzuzeigen:

```bash
balance --help
```

### **1. Hinzufügen einer Transaktion**

Füge eine neue Transaktion hinzu:

```bash
balance add <date> <category> <description> <amount>
```

**Parameter:**

- `<date>`: Datum der Transaktion im Format `DD.MM.YYYY`.
- `<category>`: Kategorie der Ausgabe.
- `<description>`: Beschreibung der Transaktion.
- `<amount>`: Betrag der Ausgabe (Dezimalzahlen mit `,` oder `.` erlaubt).

**Beispiel:**

```bash
balance add 18.12.2024 "Haushalt & Wohnen" "Monatliches Haushaltsbudget" 800,00
```

---

### **2. Anzeigen von Transaktionen**

Liste alle gespeicherten Transaktionen auf:

```bash
balance list
```

**Optionale Filter:**

- **`--category` oder `-c`**: Filtere Transaktionen nach einer Kategorie.
- **`--date` oder `-d`**: Filtere Transaktionen nach einem bestimmten Datum.
- **`--show-ids` oder `-id`**: Zeige zusätzlich die IDs der Transaktionen an.

**Beispiel:**

```bash
balance list --category "Freizeit"
balance list --date 18.12.2024
balance list --show-ids
```

---

### **3. Bearbeiten einer Transaktion**

Bearbeite eine Transaktion anhand ihrer ID:

```bash
balance edit <id> [options]
```

**Optionen:**

- **`-d, --date <date>`**: Ändere das Datum.
- **`-c, --category <category>`**: Ändere die Kategorie.
- **`-a, --amount <amount>`**: Ändere den Betrag.
- **`-desc, --description <description>`**: Ändere die Beschreibung.

**Beispiel:**

```bash
balance edit 1 --date 19.12.2024 --amount 750.00
```

---

### **4. Löschen einer Transaktion**

Lösche eine Transaktion anhand ihrer ID:

```bash
balance remove <id>
```

**Beispiel:**

```bash
balance remove 2
```

---

### **5. Erstellen eines Berichts**

Erstelle einen Bericht zur prozentualen Verteilung der Transaktionen nach Kategorie:

```bash
balance report
```

**Optionale Filter:**

- **`--month` oder `-m`**: Erstelle den Bericht für einen bestimmten Monat (Format `YYYY-MM`).

**Beispiel:**

```bash
balance report
balance report --month 2024-12
```

---

### **6. Anzeigen aller Kategorien**

Zeige alle vorhandenen Kategorien an:

```bash
balance categories
```

**Beispiel:**

```bash
balance categories
```

---

## **Beispiele**

1. **Transaktionen hinzufügen:**

   ```bash
   balance add 18.12.2024 "Haushalt & Wohnen" "Monatliches Haushaltsbudget" 800,00
   balance add 15.12.2024 "Freizeit" "Theaterbesuch" 35.90
   ```

2. **Liste aller Transaktionen anzeigen:**

   ```bash
   balance list
   ```

3. **Bearbeiten einer Transaktion:**

   ```bash
   balance edit 1 --amount 750.00
   ```

4. **Transaktion löschen:**

   ```bash
   balance remove 2
   ```

5. **Bericht erstellen:**

   ```bash
   balance report --month 2024-12
   ```

6. **Kategorien anzeigen:**
   ```bash
   balance categories
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
Wenn du Fragen oder Probleme hast, erstelle ein **Issue** auf GitHub!
