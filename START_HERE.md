# 🎉 ברוך הבא ל-Typebot Node עבור n8n!

## ✅ מה נוצר בשבילך?

יצרתי עבורך **node קהילתי מלא ומוכן לשימוש** עבור Typebot!

### 📦 מה כולל הפרויקט?

הפרויקט כולל **כל הפעולות** שזמינות ב-API של Typebot:

#### 💬 פעולות Chat
- התחל שיחה חדשה (Start Chat)
- המשך שיחה קיימת (Continue Chat)
- התחל שיחת תצוגה מקדימה (Start Preview Chat)

#### 🤖 ניהול Typebots
- רשימת כל הבוטים (List)
- קבל בוט ספציפי (Get)
- צור בוט חדש (Create)
- עדכן בוט (Update)
- מחק בוט (Delete)
- פרסם בוט (Publish)
- בטל פרסום (Unpublish)
- קבל בוט מפורסם (Get Published)

#### 📊 תוצאות (Results)
- רשימת תוצאות (List)
- קבל תוצאה ספציפית (Get)
- מחק תוצאות (Delete)
- קבל סטטיסטיקות (Get Stats)

#### 🗂️ Workspaces & Folders
- ניהול מלא של סביבות עבודה
- ניהול תיקיות
- ניהול חברי workspace

---

## 🚀 מה עכשיו? (3 אפשרויות)

### אפשרות 1: שימוש מקומי (לבדיקות) ⚡

**מתאים אם אתה רוצה לבדוק את ה-node לפני פרסום.**

#### שלבים:

1. **התקן dependencies:**
```bash
cd n8n-nodes-typebot
npm install
```

2. **בנה את הפרויקט:**
```bash
npm run build
```

3. **קשר את ה-package ל-n8n המקומי שלך:**
```bash
npm link
```

4. **בתיקיית n8n שלך (או ~/.n8n), קשר את ה-package:**
```bash
cd ~/.n8n/custom
npm link n8n-nodes-typebot
```

5. **הפעל מחדש את n8n**

---

### אפשרות 2: פרסום ל-npm (המלצה!) 🌍

**מתאים אם אתה רוצה לשתף את ה-node עם אחרים או להשתמש בו בכמה סביבות.**

#### שלבים מהירים:

1. **עדכן את package.json:**
   - פתח `package.json`
   - שנה את:
     - `"author"` - שים את השם והאימייל שלך
     - `"repository"` - אם יש לך GitHub
     - `"homepage"` - אם יש לך GitHub

2. **התקן dependencies:**
```bash
cd n8n-nodes-typebot
npm install
```

3. **בנה את הפרויקט:**
```bash
npm run build
```

4. **התחבר ל-npm:**
```bash
npm login
```
זה ישאל שם משתמש, סיסמה ואימייל.

5. **פרסם:**
```bash
npm publish
```

6. **התקן ב-n8n:**
   - פתח n8n
   - Settings → Community Nodes → Install
   - הכנס: `n8n-nodes-typebot`
   - המתן לסיום
   - הפעל מחדש את n8n

**📖 הוראות מפורטות:** קרא את `PUBLISHING.md`

---

### אפשרות 3: רק להבין איך זה עובד 📚

**אם אתה רוצה ללמוד ולהבין את הקוד.**

קרא את הקבצים בסדר הזה:

1. `QUICKSTART_HE.md` - מדריך התחלה מהירה
2. `INSTRUCTIONS_HE.md` - הוראות מפורטות
3. `credentials/TypebotApi.credentials.ts` - איך ה-authentication עובד
4. `nodes/Typebot/Typebot.node.ts` - הקוד העיקרי
5. `README.md` - תיעוד באנגלית

---

## 📁 מבנה הפרויקט

```
n8n-nodes-typebot/
├── credentials/
│   └── TypebotApi.credentials.ts  ← הגדרות authentication
├── nodes/
│   └── Typebot/
│       ├── Typebot.node.ts        ← הקוד העיקרי של ה-node
│       └── typebot.svg            ← אייקון
├── package.json                    ← הגדרות הפרויקט
├── tsconfig.json                   ← הגדרות TypeScript
├── gulpfile.js                     ← בניית אייקונים
├── .gitignore                      ← קבצים להתעלם מהם ב-git
├── .prettierrc.js                  ← הגדרות עיצוב קוד
├── .eslintrc.js                    ← בדיקות קוד
├── index.js                        ← entry point
├── README.md                       ← תיעוד ראשי (אנגלית)
├── LICENSE.md                      ← רישיון MIT
├── INSTRUCTIONS_HE.md              ← הוראות מפורטות בעברית
├── QUICKSTART_HE.md                ← מדריך התחלה מהירה
├── PUBLISHING.md                   ← איך לפרסם ל-npm
└── START_HERE.md                   ← הקובץ הזה!
```

---

## ✏️ עריכה והתאמה אישית

אם אתה רוצה לשנות משהו:

### לשנות את השם של ה-node:
1. `package.json` → שנה `"name"`
2. `README.md` → עדכן את כל האזכורים

### להוסיף פעולות נוספות:
1. פתח `nodes/Typebot/Typebot.node.ts`
2. הוסף option חדש ב-`properties`
3. הוסף logic ב-`execute()` function
4. בנה מחדש: `npm run build`

### לשנות את האייקון:
1. החלף `nodes/Typebot/typebot.svg`
2. בנה מחדש: `npm run build`

---

## 🧪 בדיקות לפני פרסום

**רשימת בדיקה:**

- [ ] `npm install` עובד בלי שגיאות
- [ ] `npm run build` עובד בלי שגיאות
- [ ] עדכנת את `package.json` עם הפרטים שלך
- [ ] בדקת את ה-node ב-n8n מקומי
- [ ] כל הפעולות עובדות כמו שצריך
- [ ] התיעוד מעודכן

---

## 🆘 עזרה ותמיכה

### יש בעיה טכנית?

1. **בעיות build:**
```bash
# מחק ונסה שוב
rm -rf node_modules dist
npm install
npm run build
```

2. **ה-node לא מופיע ב-n8n:**
   - וודא שהפעלת מחדש את n8n
   - בדוק שההתקנה הצליחה
   - נסה להתקין שוב

3. **שגיאות API:**
   - בדוק את ה-API token
   - וודא שה-Base URL נכון
   - קרא את תיעוד Typebot

### רוצה ללמוד עוד?

- **Typebot Docs**: https://docs.typebot.io/
- **n8n Docs**: https://docs.n8n.io/
- **n8n Community**: https://community.n8n.io/

---

## 📝 רשימת משימות מומלצת

אם אתה רוצה לפרסם את ה-node:

- [ ] צור חשבון npm (אם אין לך)
- [ ] עדכן `package.json` עם הפרטים שלך
- [ ] התקן dependencies: `npm install`
- [ ] בנה: `npm run build`
- [ ] בדוק מקומית
- [ ] התחבר ל-npm: `npm login`
- [ ] פרסם: `npm publish`
- [ ] (אופציונלי) צור GitHub repository
- [ ] (אופציונלי) העלה את הקוד ל-GitHub
- [ ] שתף עם הקהילה!

---

## 🎯 המלצות שלי

1. **אם אתה מתחיל:**
   - התחל עם אפשרות 1 (שימוש מקומי)
   - בדוק שהכל עובד
   - אחר כך עבור לאפשרות 2 (פרסום)

2. **אם יש לך ניסיון:**
   - לך ישר לאפשרות 2 (פרסום ל-npm)
   - צור GitHub repository
   - שתף עם הקהילה

3. **בכל מקרה:**
   - קרא את `QUICKSTART_HE.md`
   - נסה כמה workflows
   - תהנה! 🎉

---

## 💬 שאלות נפוצות

**ש: כמה זמן לוקח להתקין?**
ת: כ-5 דקות (בלי פרסום), כ-15 דקות (עם פרסום)

**ש: צריך לדעת לתכנת?**
ת: לא! אם רק רוצה להשתמש ב-node. כן, אם רוצה לשנות אותו.

**ש: האם זה בחינם?**
ת: כן! לגמרי בחינם. MIT License.

**ש: מה אם יש באג?**
ת: פתח issue ב-GitHub או תקן בעצמך ושלח PR.

---

## 🙏 תודות

תודה שבחרת להשתמש ב-Typebot Node!

אם זה עזר לך, שתף עם אחרים 💙

**בהצלחה!** 🚀
