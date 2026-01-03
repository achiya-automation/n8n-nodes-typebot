# הוראות התקנה ושימוש ב-Typebot Node עבור n8n

## מה זה?

זה node קהילתי עבור n8n שמאפשר לך לעבוד עם Typebot (מערכת לבניית צ'אט בוטים) ישירות מתוך ה-workflows שלך ב-n8n.

## התקנה

### דרך 1: התקנה דרך ממשק n8n (הכי פשוט!)

1. **פתח את n8n שלך**
   - היכנס למערכת n8n שלך

2. **עבור להגדרות**
   - לחץ על **Settings** (הגדרות) בתפריט

3. **היכנס ל-Community Nodes**
   - בתפריט ההגדרות, בחר **Community Nodes**

4. **התקן את ה-Node**
   - לחץ על כפתור **Install** (התקן)
   - בשדה "npm Package Name", כתוב: `n8n-nodes-typebot`
   - לחץ **Install**

5. **הפעל מחדש את n8n**
   - לאחר ההתקנה, צריך להפעיל מחדש את n8n

### דרך 2: התקנה ידנית (למתקדמים)

אם אתה מריץ את n8n על שרת או במחשב שלך:

**בטרמינל, הרץ את הפקודות הבאות:**

```bash
cd ~/.n8n/custom
npm install n8n-nodes-typebot
```

**אחרי זה הפעל מחדש את n8n**

## איך מקבלים API Token מ-Typebot?

לפני שתוכל להשתמש ב-node, אתה צריך לקבל טוקן (מפתח) מ-Typebot:

### שלבים פשוטים:

1. **היכנס ל-Typebot שלך**
   - לך לאתר: https://app.typebot.io
   - התחבר עם המשתמש והסיסמה שלך

2. **עבור להגדרות**
   - לחץ על **Settings & Members** (הגדרות וחברים)
   - בחר **My account** (החשבון שלי)

3. **צור טוקן**
   - גלול למטה עד שתמצא **API tokens**
   - לחץ על **Create** (צור)
   - תן שם לטוקן (למשל: "n8n integration")
   - לחץ **Create**

4. **העתק את הטוקן**
   - **חשוב!** תעתיק את הטוקן שנוצר
   - תשמור אותו במקום בטוח - לא תוכל לראות אותו שוב!

## איך להגדיר את ה-Credentials ב-n8n?

אחרי שיש לך את הטוקן, צריך להגדיר אותו ב-n8n:

1. **פתח את n8n**

2. **עבור ל-Credentials**
   - לחץ על **Credentials** בתפריט
   - לחץ על **New** (חדש)

3. **חפש "Typebot API"**
   - בחיפוש, כתוב "Typebot"
   - בחר **Typebot API**

4. **הזן את הפרטים**
   - **API Token**: הדבק את הטוקן שהעתקת קודם
   - **Base URL**:
     - אם אתה משתמש ב-Typebot הרגיל (בענן): `https://app.typebot.io/api`
     - אם יש לך Typebot משלך על שרת: `https://your-domain.com/api`

5. **שמור**
   - לחץ **Save**

## מה אפשר לעשות עם ה-Node?

ה-node הזה תומך בכל הפעולות של Typebot:

### שיחות (Chat)
- **התחל שיחה חדשה** - להתחיל שיחה עם בוט
- **המשך שיחה** - להמשיך שיחה קיימת
- **התחל שיחת תצוגה מקדימה** - לבדוק בוט לפני פרסום

### ניהול בוטים (Typebot Management)
- **רשימת בוטים** - לראות את כל הבוטים שלך
- **קבל בוט** - לקבל פרטים על בוט מסוים
- **צור בוט** - ליצור בוט חדש
- **עדכן בוט** - לשנות בוט קיים
- **מחק בוט** - למחוק בוט
- **פרסם בוט** - לפרסם בוט
- **בטל פרסום** - להסיר בוט מפרסום

### תוצאות (Results)
- **רשימת תוצאות** - לראות את כל התשובות שקיבלת
- **קבל תוצאה** - לראות תוצאה ספציפית
- **מחק תוצאות** - למחוק תוצאות
- **קבל סטטיסטיקות** - לראות נתונים על הבוט

### סביבות עבודה ותיקיות (Workspaces & Folders)
- ניהול מלא של סביבות עבודה ותיקיות

## דוגמאות שימוש פשוטות

### דוגמה 1: איך להתחיל שיחה עם בוט

1. **הוסף את ה-Typebot node ל-workflow**
   - גרור את ה-node מהתפריט לאזור העבודה

2. **בחר בהגדרות:**
   - **Resource** (משאב): בחר **Chat**
   - **Operation** (פעולה): בחר **Start Chat**

3. **הזן פרטים:**
   - **Public ID**: תמצא אותו בהגדרות הבוט שלך ב-Typebot
   - **Message** (אופציונלי): אפשר לשלוח הודעה ראשונה

4. **הפעל את ה-node**
   - התוצאה תכלול:
     - `sessionId` - תשתמש בו כדי להמשיך את השיחה
     - `messages` - התשובות של הבוט
     - `input` - מה הבוט מצפה לקבל הלאה

### דוגמה 2: איך להמשיך שיחה

1. **הוסף עוד Typebot node**

2. **בחר:**
   - **Resource**: **Chat**
   - **Operation**: **Continue Chat**

3. **הזן:**
   - **Session ID**: ה-sessionId שקיבלת בשלב הקודם
   - **Message**: ההודעה של המשתמש

### דוגמה 3: איך לראות את כל התוצאות

1. **הוסף Typebot node**

2. **בחר:**
   - **Resource**: **Result**
   - **Operation**: **List**

3. **הזן:**
   - **Typebot ID**: מזהה הבוט שלך

## טיפים חשובים

### עבודה עם JSON

חלק מהפעולות דורשות להזין JSON (למשל יצירת בוט חדש):
- אפשר להשתמש ב-**Code node** להכנת המידע
- אפשר להשתמש ב-**Set node** לבניית אובייקטים מורכבים

### טיפול בשגיאות

- אפשר להפעיל **Continue On Fail** בהגדרות ה-node
- ככה גם אם יש שגיאה, ה-workflow ימשיך לעבוד
- השגיאה תופיע בפלט של ה-node

## שאלות ותמיכה

אם משהו לא עובד או יש שאלות:
1. בדוק את התיעוד של Typebot: https://docs.typebot.io/
2. בדוק את התיעוד של n8n: https://docs.n8n.io/
3. פתח issue ב-GitHub (אם יש בעיה טכנית)

## מה עכשיו?

1. **התקן את ה-node** (לפי ההוראות למעלה)
2. **הגדר את ה-credentials** עם הטוקן שלך
3. **צור workflow חדש** ב-n8n
4. **נסה להתחיל שיחה** עם אחד הבוטים שלך
5. **תהנה!** 🎉

---

**שים לב:** אם אתה לא בטוח איך לעשות משהו, תמיד עדיף לשאול לפני במקום לנסות ולטעות. התיעוד של Typebot ושל n8n מאוד מפורטים ויכולים לעזור.
