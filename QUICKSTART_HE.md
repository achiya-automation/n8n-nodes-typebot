# מדריך התחלה מהירה - Typebot Node

## 📋 רשימת בדיקה מהירה

לפני שמתחילים, וודא שיש לך:
- [ ] חשבון Typebot (cloud או self-hosted)
- [ ] n8n מותקן ועובד
- [ ] API token מ-Typebot

## 🚀 התחלה מהירה ב-5 דקות

### 1️⃣ קבל API Token (2 דקות)

1. היכנס ל-https://app.typebot.io
2. לחץ **Settings & Members** → **My account**
3. גלול ל-**API tokens** → לחץ **Create**
4. העתק את הטוקן ושמור אותו

### 2️⃣ התקן את ה-Node (1 דקה)

**ב-n8n:**
1. **Settings** → **Community Nodes**
2. **Install** → הכנס `n8n-nodes-typebot`
3. המתן לסיום ההתקנה
4. הפעל מחדש את n8n

### 3️⃣ הגדר Credentials (1 דקה)

1. ב-n8n, לך ל-**Credentials** → **New**
2. חפש **"Typebot API"**
3. הזן:
   - **API Token**: הטוקן שהעתקת
   - **Base URL**: `https://app.typebot.io/api`
4. **Save**

### 4️⃣ בדיקה ראשונה (1 דקה)

**צור workflow חדש:**

1. הוסף **Typebot node**
2. בחר:
   - Resource: **Typebot**
   - Operation: **List**
3. לחץ **Execute node**
4. אמור לראות רשימה של הבוטים שלך!

## 💬 תרחיש שימוש מהיר: שיחה עם בוט

### מה נבנה?
workflow פשוט שמתחיל שיחה עם בוט ומדפיס את התשובות.

### צעדים:

**Node 1: Manual Trigger** (טריגר ידני)
- פשוט כדי להפעיל את ה-workflow

**Node 2: Typebot - Start Chat**
- Resource: **Chat**
- Operation: **Start Chat**
- Public ID: `[הכנס את ה-public ID של הבוט שלך]`
- Message: `שלום!`

**Node 3: Typebot - Continue Chat**
- Resource: **Chat**
- Operation: **Continue Chat**
- Session ID: `{{ $json.sessionId }}`
- Message: `איך אתה?`

**זהו!** הפעל את ה-workflow ותראה את השיחה.

## 🎯 תרחישים נוספים

### תרחיש 1: שמירת תוצאות ב-Google Sheets

```
Manual Trigger → Typebot (Get Results) → Google Sheets (Append)
```

**למה זה טוב?**
- שומר את כל התשובות מהבוט שלך בגיליון
- מעולה לניתוח נתונים

### תרחיש 2: התראה כשיש תוצאה חדשה

```
Schedule Trigger → Typebot (Get Stats) → IF → Slack/Email
```

**למה זה טוב?**
- מקבל התראה כשמישהו מילא את הבוט
- יכול לשלוח ל-Slack, Email, או כל מקום אחר

### תרחיש 3: שיחה אוטומטית מ-Webhook

```
Webhook → Typebot (Start Chat) → Function → HTTP Response
```

**למה זה טוב?**
- מאפשר לשלב את הבוט באפליקציה שלך
- יכול לקבל בקשות מבחוץ ולהחזיר תשובות

## 🔧 פתרון בעיות מהיר

### ❌ שגיאה: "Authorization not provided"
**פתרון:**
- בדוק שהגדרת את ה-credentials
- וודא שהטוקן נכון
- נסה ליצור טוקן חדש

### ❌ שגיאה: "Typebot not found"
**פתרון:**
- בדוק שה-Public ID נכון
- וודא שהבוט מפורסם (published)
- נסה לקחת את ה-ID מההגדרות של הבוט

### ❌ שגיאה: "Invalid JSON"
**פתרון:**
- אם השדה מצפה ל-JSON, תוודא שזה JSON תקני
- השתמש ב-JSON validator כמו https://jsonlint.com/
- או השתמש ב-**Set node** לבניית האובייקט

### ❌ ה-Node לא מופיע ב-n8n
**פתרון:**
- וודא שהפעלת מחדש את n8n
- בדוק שההתקנה הסתיימה בהצלחה
- נסה להתקין שוב

## 📚 איפה ללמוד עוד?

1. **תיעוד מלא בעברית**: `INSTRUCTIONS_HE.md`
2. **תיעוד Typebot**: https://docs.typebot.io/
3. **קהילת n8n**: https://community.n8n.io/
4. **דוגמאות workflows**: https://n8n.io/workflows/

## 💡 טיפים לשימוש מתקדם

### טיפ 1: שימוש במשתנים
```
אפשר לשלוח משתנים מראש:
Prefilled Variables:
{
  "name": "ישראל",
  "email": "user@example.com"
}
```

### טיפ 2: עבודה עם Session ID
```
תמיד שמור את ה-sessionId כדי להמשיך שיחה:
{{ $node["Start Chat"].json["sessionId"] }}
```

### טיפ 3: לולאות על תוצאות
```
אפשר לעבור על כל התוצאות עם Loop node:
Loop Over Items → Process Each Result
```

## ⚡ קיצורי דרך

### לקבל את כל התוצאות מהיום
```
Resource: Result
Operation: List
Typebot ID: [your-id]
→ הוסף Function node לסינון לפי תאריך
```

### לשלוח הודעה לכל מי שמילא את הבוט
```
Get Results → Loop → Email/Slack
```

### לייצא לקובץ CSV
```
Get Results → Spreadsheet File → Email/Download
```

## 🎉 מוכן להתחיל!

עכשיו אתה יודע את הבסיס. תתחיל עם משהו פשוט ותתקדם משם.

**זכור:** כל workflow מתחיל מרעיון פשוט. אל תפחד לנסות!

---

**צריך עזרה?** תסתכל ב-`INSTRUCTIONS_HE.md` להוראות מפורטות יותר.
