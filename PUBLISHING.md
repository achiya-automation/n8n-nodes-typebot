# Publishing Guide - איך לפרסם את ה-Node ל-npm

## מה זה npm ולמה צריך לפרסם שם?

npm זה המקום שבו כל ה-packages של JavaScript נמצאים. כשאתה מפרסם את ה-node שלך שם, אנשים אחרים יכולים להתקין אותו ישירות ב-n8n שלהם.

## מה צריך לפני שמתחילים?

1. **חשבון npm** - צריך להירשם ב-https://www.npmjs.com/
2. **npm מותקן** - בדרך כלל מותקן אוטומטית עם Node.js
3. **git מותקן** (מומלץ) - לניהול גרסאות

## שלב 1: עדכן את פרטי ה-package.json

לפני שמפרסמים, צריך לעדכן כמה דברים ב-`package.json`:

### דברים שחובה לשנות:

1. **שם ה-package** - אם רוצה שם אחר:
```json
"name": "n8n-nodes-typebot"
```

2. **גרסה** - תמיד מתחילים מ-1.0.0:
```json
"version": "1.0.0"
```

3. **מחבר** - הכנס את הפרטים שלך:
```json
"author": {
  "name": "השם שלך",
  "email": "your.email@example.com"
}
```

4. **repository** - אם יש לך GitHub:
```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/yourusername/n8n-nodes-typebot.git"
}
```

5. **homepage** - אותו URL:
```json
"homepage": "https://github.com/yourusername/n8n-nodes-typebot"
```

## שלב 2: התחבר ל-npm

פתח טרמינל (או Command Prompt בווינדוס) והרץ:

```bash
npm login
```

זה ישאל אותך:
- **Username**: שם המשתמש שלך ב-npm
- **Password**: הסיסמה
- **Email**: האימייל שלך

## שלב 3: בדוק שהכל תקין

לפני פרסום, כדאי לבדוק שהכל עובד:

```bash
cd n8n-nodes-typebot
npm run build
```

הפקודה הזאת:
- תבנה את הקוד (תהפוך את ה-TypeScript ל-JavaScript)
- תבדוק שאין שגיאות

אם יש שגיאות, תקן אותן לפני שממשיכים.

## שלב 4: פרסם את ה-package

אם הכל עבד טוב בשלב הקודם, תפרסם:

```bash
npm publish
```

**זהו!** ה-node שלך עכשיו ב-npm!

## שלב 5: בדוק שהכל עבד

1. לך ל-https://www.npmjs.com/package/n8n-nodes-typebot
2. אמור לראות את ה-package שלך שם
3. עכשיו אפשר להתקין אותו ב-n8n!

## איך לעדכן גרסה?

כשאתה עושה שינויים ורוצה לפרסם גרסה חדשה:

### צעד 1: עדכן את מספר הגרסה

יש 3 סוגי עדכונים:

1. **תיקון באג קטן** (1.0.0 → 1.0.1):
```bash
npm version patch
```

2. **תכונה חדשה** (1.0.0 → 1.1.0):
```bash
npm version minor
```

3. **שינוי גדול שבור תאימות אחורה** (1.0.0 → 2.0.0):
```bash
npm version major
```

### צעד 2: פרסם שוב

```bash
npm publish
```

## בעיות נפוצות ופתרונות

### בעיה: "You do not have permission to publish"

**פתרון:**
- תבדוק שאתה מחובר: `npm whoami`
- אם השם כבר תפוס, תשנה אותו ב-`package.json`

### בעיה: "version already exists"

**פתרון:**
- תריץ `npm version patch` (או minor/major)
- אחר כך `npm publish`

### בעיה: בעיות build

**פתרון:**
```bash
# מחק קבצים ישנים
rm -rf node_modules dist

# התקן מחדש
npm install

# בנה מחדש
npm run build
```

## טיפים חשובים

1. **תמיד תבנה לפני פרסום**: `npm run build`
2. **תבדוק את הקוד**: וודא שאין שגיאות
3. **תכתוב changelog**: רשום מה השתנה בכל גרסה
4. **תבדוק אחרי פרסום**: נסה להתקין את ה-package ב-n8n

## אופציונלי: שימוש ב-Git

אם אתה משתמש ב-Git (מומלץ!):

```bash
# אתחל git
cd n8n-nodes-typebot
git init

# הוסף קבצים
git add .

# צור commit
git commit -m "Initial version"

# העלה ל-GitHub (אם יש repository)
git remote add origin https://github.com/yourusername/n8n-nodes-typebot.git
git push -u origin main
```

## מה הלאה?

אחרי שפרסמת:

1. **שתף** - ספר לאנשים על ה-node שלך
2. **תחזוקה** - תענה על issues ב-GitHub
3. **שפר** - הוסף תכונות חדשות
4. **תעדכן** - פרסם גרסאות חדשות

---

**זכור**: הפרסום הראשון הוא הכי קשה. אחרי זה זה פשוט!

אם יש בעיות, תמיד אפשר לחפש עזרה ב:
- תיעוד npm: https://docs.npmjs.com/
- קהילת n8n: https://community.n8n.io/
