export type QA = { q_he: string; a_he: string; q_en: string; a_en: string };
export type Topic = { id: string; title_he: string; title_en: string; items: QA[] };

export const QA_TOPICS: Topic[] = [
  {
    id: "roles",
    title_he: "תפקידים בצוות",
    title_en: "Team Roles",
    items: [
      {
        q_he: "מה תפקידו של איש QA?",
        a_he: "איש QA אחראי על אבטחת איכות המוצר: כתיבת תכניות בדיקה, ביצוע בדיקות ידניות ואוטומציה, איתור באגים, תיעודם במערכת ניהול באגים, אימות תיקונים והבטחה שהמוצר עומד בדרישות העסקיות והטכניות לפני שחרור לייצור.",
        q_en: "What does a QA engineer do?",
        a_en: "A QA engineer ensures product quality by writing test plans, running manual and automated tests, finding bugs, documenting them in a tracking system, verifying fixes, and making sure the product meets business and technical requirements before release.",
      },
      {
        q_he: "מה תפקידו של מנהל מוצר?",
        a_he: "מנהל מוצר מגדיר את החזון והדרישות של המוצר, מתעדף פיצ'רים, מתאם בין משתמשים, פיתוח, עיצוב ועסקים, וכותב מסמכי דרישות (PRD). אחראי על מה נבנה ולמה, לא על איך.",
        q_en: "What does a Product Manager do?",
        a_en: "A PM defines the product vision and requirements, prioritizes features, aligns users, dev, design and business, and writes PRDs. Owns the what and the why, not the how.",
      },
      {
        q_he: "מה תפקידו של מנהל פרויקטים?",
        a_he: "מנהל פרויקטים אחראי על תכנון, ביצוע ומסירה של פרויקט בזמן, בתקציב ובהיקף. עוקב אחרי משימות, תלויות וסיכונים, מתאם בין צוותים, ומדווח לסטייקהולדרים.",
        q_en: "What does a Project Manager do?",
        a_en: "A Project Manager plans, executes and delivers a project on time, on budget and in scope. Tracks tasks, dependencies and risks, coordinates teams, and reports to stakeholders.",
      },
    ],
  },
  {
    id: "test-types",
    title_he: "סוגי בדיקות",
    title_en: "Test Types",
    items: [
      {
        q_he: "מה זה Unit test?",
        a_he: "בדיקת יחידה הבודקת את היחידה הקטנה ביותר של קוד (פונקציה / מתודה) בבידוד, על ידי המפתח. רצה מהר, חוזרת על עצמה, ולא תלויה ברכיבים חיצוניים – לרוב מחליפה תלויות ב-Mocks.",
        q_en: "What is a Unit test?",
        a_en: "A test that verifies the smallest piece of code (a function/method) in isolation, written by the developer. It is fast, repeatable, and uses mocks to replace external dependencies.",
      },
      {
        q_he: "מה זה Sanity test?",
        a_he: "בדיקת שפיות קצרה ומצומצמת אחרי שינוי נקודתי, שמטרתה לוודא שהפיצ'ר הספציפי שעודכן עובד והמערכת לא 'מתה'. בניגוד לרגרסיה היא ממוקדת ולא רחבה.",
        q_en: "What is a Sanity test?",
        a_en: "A quick, narrow check after a small change to confirm that the specific feature still works and the system is stable. Unlike regression, it is focused, not broad.",
      },
      {
        q_he: "מה זה Regression?",
        a_he: "בדיקה רוחבית שמוודאת ששינויים חדשים בקוד לא שברו פונקציונליות קיימת. בדרך כלל מורצת אוטומטית לפני כל גרסה.",
        q_en: "What is Regression testing?",
        a_en: "Broad testing that verifies new code changes haven't broken existing functionality. Usually automated and run before each release.",
      },
      {
        q_he: "מה ההבדל בין Black box ל-White box?",
        a_he: "Black box: בודקים את המערכת לפי הקלט והפלט בלבד, בלי לדעת איך היא בנויה בפנים. White box: לבודק יש גישה לקוד המקור והוא מתכנן בדיקות לפי המבנה הפנימי, התניות וזרימת הקוד.",
        q_en: "Black box vs White box testing?",
        a_en: "Black box: testing by inputs/outputs only, without knowing internal implementation. White box: the tester sees the source code and designs tests based on internal structure, branches and code paths.",
      },
      {
        q_he: "מה זה Boundary Values?",
        a_he: "טכניקת בדיקה שמתמקדת בערכי הקצה של טווח חוקי – המינימום, המקסימום וערך אחד מתחת/מעל. שם מתגלים רוב הבאגים של אי-שוויונות (off-by-one).",
        q_en: "What are Boundary Values?",
        a_en: "A technique that tests at the edges of valid ranges – min, max and one below/above. Most off-by-one bugs hide there.",
      },
      {
        q_he: "מה זה End to End?",
        a_he: "בדיקה שמדמה תהליך עסקי שלם של משתמש אמיתי, מהממשק ועד מסד הנתונים והשירותים החיצוניים, כדי לוודא שכל החלקים עובדים יחד.",
        q_en: "What is End-to-End testing?",
        a_en: "Testing a complete user flow from UI through DB and external services to verify the whole system works together.",
      },
    ],
  },
  {
    id: "bug",
    title_he: "באגים ומחזור חיים",
    title_en: "Bugs & Lifecycle",
    items: [
      {
        q_he: "איך מתעדים באג?",
        a_he: "באג טוב כולל: כותרת קצרה וברורה, סביבה (גרסה / OS / דפדפן), שלבי שחזור, תוצאה צפויה מול תוצאה בפועל, חומרה ועדיפות, צילומי מסך / לוגים, ומשתמש שמשויך לטיפול.",
        q_en: "How do you document a bug?",
        a_en: "A good bug report includes: clear title, environment (version/OS/browser), reproduction steps, expected vs actual result, severity & priority, screenshots/logs, and an assignee.",
      },
      {
        q_he: "מהו Severity ומהו Priority?",
        a_he: "Severity = חומרת הפגיעה הטכנית של הבאג במערכת (קריטי/גבוה/בינוני/נמוך). Priority = דחיפות הטיפול מבחינה עסקית. באג יכול להיות חמור אבל לא דחוף, ולהפך.",
        q_en: "What are Severity and Priority?",
        a_en: "Severity = how badly the bug affects the system technically. Priority = how urgently the business needs it fixed. A bug can be severe but not urgent, and vice versa.",
      },
      {
        q_he: "מהו מחזור חיי הבאג?",
        a_he: "New → Assigned → Open / In Progress → Fixed → Ready for Test → Verified → Closed. אם הבאג לא תוקן או חוזר: Reopened. אם זה לא באג: Rejected / Won't Fix.",
        q_en: "What is the bug lifecycle?",
        a_en: "New → Assigned → Open/In Progress → Fixed → Ready for Test → Verified → Closed. If not fixed or recurs: Reopened. If not a bug: Rejected/Won't Fix.",
      },
    ],
  },
  {
    id: "envs",
    title_he: "סביבות עבודה",
    title_en: "Environments",
    items: [
      {
        q_he: "מהי סביבת Production?",
        a_he: "הסביבה החיה, שבה לקוחות אמיתיים משתמשים במוצר. מכילה את הנתונים האמיתיים – אסור לבדוק עליה, וכל באג בה משפיע ישירות על המשתמשים.",
        q_en: "What is the Production environment?",
        a_en: "The live environment used by real customers with real data. You don't test there – every bug directly affects users.",
      },
      {
        q_he: "מהי סביבת Staging?",
        a_he: "סביבה זהה ככל האפשר ל-Production, מיועדת לאימות סופי לפני שחרור: בדיקות קבלה, הדגמות ובדיקות ביצועים על נתוני דמה הקרובים לאמת.",
        q_en: "What is Staging?",
        a_en: "A near-identical clone of production used for final verification before release: acceptance tests, demos and performance checks on realistic data.",
      },
      {
        q_he: "מהו Code Freeze?",
        a_he: "תקופה שבה לא מכניסים שינויי קוד חדשים מלבד תיקוני באגים קריטיים, על מנת לייצב את הגרסה לקראת שחרור.",
        q_en: "What is Code Freeze?",
        a_en: "A period when no new code changes are allowed except critical bug fixes, in order to stabilize the version before release.",
      },
    ],
  },
  {
    id: "web",
    title_he: "רשת ופרוטוקולים",
    title_en: "Web & Protocols",
    items: [
      {
        q_he: "מהו HTTP ומהו HTTPS?",
        a_he: "HTTP הוא פרוטוקול לתקשורת בין דפדפן לשרת באינטרנט. HTTPS הוא HTTP מוצפן באמצעות TLS/SSL – הנתונים העוברים בין הדפדפן לשרת מוצפנים ולא ניתנים לקריאה ע\"י צד שלישי.",
        q_en: "What are HTTP and HTTPS?",
        a_en: "HTTP is the protocol browsers use to talk to web servers. HTTPS is HTTP wrapped in TLS/SSL encryption, so traffic between client and server can't be read by third parties.",
      },
      {
        q_he: "מה זה API?",
        a_he: "Application Programming Interface – חוזה שמגדיר איך שתי תוכנות מתקשרות ביניהן: אילו פעולות אפשר לקרוא, אילו פרמטרים לשלוח ומה חוזר. ב-Web מדובר לרוב ב-REST/HTTP עם JSON.",
        q_en: "What is an API?",
        a_en: "Application Programming Interface – a contract that defines how two pieces of software talk: what operations are exposed, what parameters to send and what comes back. On the web it's usually REST/HTTP with JSON.",
      },
      {
        q_he: "מה זה JSON?",
        a_he: "JavaScript Object Notation – פורמט טקסטואלי קריא לבני אדם ולמכונה, להעברת נתונים מבוססי מפתח/ערך. שפת ברירת המחדל ל-API מודרני.",
        q_en: "What is JSON?",
        a_en: "JavaScript Object Notation – a human-readable, machine-friendly text format for key/value data. The default payload for modern APIs.",
      },
      {
        q_he: "מה זה Cookie?",
        a_he: "קובץ קטן שהשרת שולח לדפדפן, נשמר אצל המשתמש ונשלח חזרה בכל בקשה לאותו אתר. משמש לשמירת סשן, העדפות וזיהוי משתמש.",
        q_en: "What is a Cookie?",
        a_en: "A small file the server sends to the browser; it's stored on the user's machine and sent back on every request. Used for sessions, preferences and user identification.",
      },
    ],
  },
  {
    id: "automation",
    title_he: "אוטומציה וכלים",
    title_en: "Automation & Tools",
    items: [
      {
        q_he: "מתי נכון לעבור לאוטומציית בדיקות?",
        a_he: "כשיש סטים של בדיקות חוזרות (רגרסיה, סמוק), כאשר הפונקציונליות יציבה יחסית, כשהבדיקה הידנית יקרה או איטית מדי, ועבור תרחישים שקשה לבדוק ידנית (עומסים, נתונים גדולים).",
        q_en: "When should you automate tests?",
        a_en: "When you have repeating test suites (regression, smoke), when functionality is relatively stable, when manual testing is too slow or costly, and for scenarios hard to test manually (load, large datasets).",
      },
      {
        q_he: "מהי פירמידת הבדיקות?",
        a_he: "מודל שממליץ על הרבה Unit tests בבסיס (מהירים וזולים), פחות Integration tests באמצע, ומעט End-to-End tests בקצה (יקרים ושבירים). מטרתה לאזן מהירות, יציבות ועלות.",
        q_en: "What is the testing pyramid?",
        a_en: "A model recommending many fast/cheap unit tests at the base, fewer integration tests in the middle, and few slow/brittle E2E tests at the top. It balances speed, stability and cost.",
      },
    ],
  },
];

export const SOFTWARE_TOPICS: Topic[] = [
  {
    id: "fundamentals",
    title_he: "יסודות תוכנה",
    title_en: "Software Fundamentals",
    items: [
      {
        q_he: "מה ההבדל בין Compiler ל-Interpreter?",
        a_he: "Compiler מתרגם את כל הקוד פעם אחת לקוד מכונה לפני ההרצה (C, C++, Go). Interpreter מתרגם ומריץ שורה-שורה בזמן ריצה (Python, JavaScript). קומפיילר מהיר יותר בהרצה, אינטרפרטר גמיש יותר.",
        q_en: "Compiler vs Interpreter?",
        a_en: "A compiler translates all code to machine code once before running (C, C++, Go). An interpreter translates and runs line by line at runtime (Python, JavaScript). Compiled code runs faster; interpreted is more flexible.",
      },
      {
        q_he: "מה זה משתנה (Variable)?",
        a_he: "שם סמלי שמצביע על מקום בזיכרון שמכיל ערך. לפי השפה, יכול להיות עם טיפוס קבוע (typed) או דינמי, וניתן לשנות את הערך שמאוחסן בו (אם הוא לא קבוע).",
        q_en: "What is a Variable?",
        a_en: "A symbolic name pointing to a memory location that holds a value. Depending on the language it can be typed or dynamic, and its value may change (unless declared constant).",
      },
      {
        q_he: "מה זה Stack ומה זה Heap?",
        a_he: "Stack: זיכרון מהיר שמנוהל אוטומטית, מאחסן משתנים מקומיים וקריאות פונקציה לפי LIFO. Heap: זיכרון דינמי שמוקצה ידנית/אוטומטית בזמן ריצה לאובייקטים שאורך חייהם לא ידוע מראש.",
        q_en: "Stack vs Heap?",
        a_en: "Stack: fast, auto-managed memory holding local variables and call frames (LIFO). Heap: dynamic memory allocated at runtime for objects whose lifetime isn't known in advance.",
      },
    ],
  },
  {
    id: "oop",
    title_he: "תכנות מונחה עצמים",
    title_en: "Object-Oriented Programming",
    items: [
      {
        q_he: "מהם 4 עקרונות ה-OOP?",
        a_he: "Encapsulation (כימוס) – הסתרת המימוש הפנימי; Inheritance (ירושה) – מחלקה יורשת מאחרת; Polymorphism (פולימורפיזם) – אותה קריאה מתנהגת אחרת לפי הטיפוס; Abstraction (הפשטה) – חשיפת מה בלי איך.",
        q_en: "What are the 4 OOP principles?",
        a_en: "Encapsulation – hiding implementation; Inheritance – one class derives from another; Polymorphism – same call behaves differently per type; Abstraction – exposing what without how.",
      },
      {
        q_he: "מה ההבדל בין Class ל-Object?",
        a_he: "Class הוא תבנית / תכנון: מגדיר אילו שדות ומתודות יהיו. Object הוא מופע ספציפי של ה-Class בזיכרון עם ערכים אמיתיים. Class זה המתכון, Object זה העוגה.",
        q_en: "Class vs Object?",
        a_en: "A class is a blueprint defining fields and methods. An object is a concrete instance of the class in memory with real values. Class = recipe, object = cake.",
      },
      {
        q_he: "מה זה Interface?",
        a_he: "חוזה שמגדיר אילו מתודות מחלקה חייבת לממש, בלי לספק מימוש. מאפשר להחליף מימושים שונים שמכבדים את אותו חוזה (Dependency inversion).",
        q_en: "What is an Interface?",
        a_en: "A contract that defines which methods a class must implement, without providing the implementation. Lets you swap different implementations that honor the same contract.",
      },
    ],
  },
  {
    id: "data",
    title_he: "מסדי נתונים",
    title_en: "Databases",
    items: [
      {
        q_he: "מה ההבדל בין SQL ל-NoSQL?",
        a_he: "SQL: מסד יחסי עם סכמה קבועה, טבלאות, יחסים וטרנזקציות ACID (MySQL, Postgres). NoSQL: סכמה גמישה, אופטימלי לסקלאביליות אופקית ולמסמכים (MongoDB), Key/Value (Redis) או גרפים.",
        q_en: "SQL vs NoSQL?",
        a_en: "SQL: relational with fixed schema, tables, joins and ACID transactions (MySQL, Postgres). NoSQL: flexible schema, optimized for horizontal scale and documents (MongoDB), key/value (Redis), or graphs.",
      },
      {
        q_he: "מה זה Index במסד נתונים?",
        a_he: "מבנה נתונים משני (לרוב B-Tree) שמאפשר חיפוש מהיר על עמודה בלי לסרוק את כל הטבלה. עולה במקום ובזמן כתיבה – לכן יוצרים אינדקסים רק לשאילתות נפוצות.",
        q_en: "What is a database Index?",
        a_en: "A secondary data structure (often a B-Tree) that lets you find rows by a column quickly without scanning the whole table. It costs storage and write time, so create them only for common queries.",
      },
      {
        q_he: "מה זה SQL Injection?",
        a_he: "התקפת אבטחה שבה תוקף משחיל קוד SQL זדוני דרך קלט משתמש שלא עובר sanitization, ויכול לקרוא / לשנות / למחוק נתונים. ההגנה: Prepared statements ופרמטריזציה.",
        q_en: "What is SQL Injection?",
        a_en: "A security attack where the attacker injects malicious SQL through user input that isn't sanitized, allowing them to read/modify/delete data. Defense: prepared statements and parameterized queries.",
      },
    ],
  },
  {
    id: "infra",
    title_he: "תשתיות ורשתות",
    title_en: "Infra & Networking",
    items: [
      {
        q_he: "מהו שרת?",
        a_he: "מחשב או תוכנה שמעניק שירות ללקוחות אחרים ברשת (Web, DB, Mail). מאזין על פורט מסוים, מקבל בקשות, מטפל בהן ומחזיר תגובה.",
        q_en: "What is a server?",
        a_en: "A machine or program that provides a service to clients over a network (Web, DB, Mail). It listens on a port, accepts requests, handles them and returns responses.",
      },
      {
        q_he: "מה זה Load Balancer?",
        a_he: "רכיב רשת שמחלק תעבורת בקשות בין מספר שרתים זהים, כדי להגדיל יכולת, לשפר זמינות ולמנוע נקודת כשל בודדת. אסטרטגיות נפוצות: Round Robin, Least Connections.",
        q_en: "What is a Load Balancer?",
        a_en: "A network component that distributes traffic across several identical servers to scale capacity, improve availability and avoid a single point of failure. Common strategies: Round Robin, Least Connections.",
      },
      {
        q_he: "מהו Virtualization?",
        a_he: "הרצת מערכת הפעלה או מכונה וירטואלית מעל חומרה פיזית, כך שמשאב פיזי אחד משרת מספר 'מכונות' מבודדות. הבסיס למחשוב ענן וקונטיינרים.",
        q_en: "What is Virtualization?",
        a_en: "Running an OS or virtual machine on top of physical hardware so one physical resource hosts several isolated 'machines'. The foundation of cloud computing and containers.",
      },
    ],
  },
  {
    id: "devops",
    title_he: "DevOps וענן",
    title_en: "DevOps & Cloud",
    items: [
      {
        q_he: "מה זה CI/CD?",
        a_he: "Continuous Integration: כל קומיט עובר build ובדיקות אוטומטיות. Continuous Delivery/Deployment: הקוד שעובר אוטומטית נארז ונפרס לסביבת בדיקה או ישירות לייצור. מטרה: שחרורים מהירים ויציבים.",
        q_en: "What is CI/CD?",
        a_en: "Continuous Integration: every commit is built and tested automatically. Continuous Delivery/Deployment: passing code is packaged and shipped to a test environment or directly to production. Goal: fast, stable releases.",
      },
      {
        q_he: "מה ההבדל בין Container ל-VM?",
        a_he: "VM: מכילה מערכת הפעלה מלאה מעל hypervisor – כבדה ואיטית להפעלה. Container: משתמש בקרנל של ה-host ומבודד רק את הפרוסס – קל, מהיר וצורך פחות משאבים (Docker).",
        q_en: "Container vs VM?",
        a_en: "A VM contains a full OS on top of a hypervisor – heavy and slow to boot. A container shares the host kernel and isolates only the process – lightweight, fast and resource-efficient (Docker).",
      },
      {
        q_he: "מה זה Cloud Computing?",
        a_he: "צריכת משאבי מחשוב (שרתים, אחסון, מסדי נתונים, רשת) לפי דרישה משירות מנוהל באינטרנט (AWS, Azure, GCP) במקום להפעיל חוות שרתים פיזית. תשלום לפי שימוש.",
        q_en: "What is Cloud Computing?",
        a_en: "Consuming compute resources (servers, storage, DBs, network) on demand from a managed internet service (AWS, Azure, GCP) instead of running your own physical data center. Pay per use.",
      },
    ],
  },
];
