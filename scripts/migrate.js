const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

async function runMigration() {
  console.log('Starting migration...');
  
  const createVisitorsTable = `
    CREATE TABLE IF NOT EXISTS visitors (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      first_visit_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_visit_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      visit_count INTEGER DEFAULT 1,
      ip_address TEXT,
      user_agent TEXT,
      referrer TEXT
    );
  `;

  const createVisitEventsTable = `
    CREATE TABLE IF NOT EXISTS visit_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
      visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      pages_viewed JSONB,
      session_duration_seconds INTEGER
    );
  `;

  const createProjectsTable = `
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title JSONB NOT NULL,
      role JSONB NOT NULL,
      context JSONB,
      start_date TEXT,
      duration TEXT,
      status TEXT,
      team_size TEXT,
      responsibilities JSONB,
      problem_statement JSONB,
      solution_overview JSONB,
      metrics JSONB,
      key_achievements JSONB,
      architecture_decisions JSONB,
      business_impact JSONB,
      tech_stack JSONB,
      live_url TEXT,
      repo_url TEXT,
      display_order INTEGER,
      is_published BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const alterToJSONB = `
    DO $$ 
    BEGIN 
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='title' AND data_type='text') THEN
        ALTER TABLE projects ALTER COLUMN title TYPE JSONB USING jsonb_build_object('en', title);
        ALTER TABLE projects ALTER COLUMN role TYPE JSONB USING jsonb_build_object('en', role);
        ALTER TABLE projects ALTER COLUMN context TYPE JSONB USING jsonb_build_object('en', context);
        ALTER TABLE projects ALTER COLUMN responsibilities TYPE JSONB USING jsonb_build_object('en', responsibilities);
        ALTER TABLE projects ALTER COLUMN problem_statement TYPE JSONB USING jsonb_build_object('en', problem_statement);
        ALTER TABLE projects ALTER COLUMN solution_overview TYPE JSONB USING jsonb_build_object('en', solution_overview);
        ALTER TABLE projects ALTER COLUMN architecture_decisions TYPE JSONB USING jsonb_build_object('en', architecture_decisions);
        ALTER TABLE projects ALTER COLUMN business_impact TYPE JSONB USING jsonb_build_object('en', business_impact);
      END IF;
    END $$;
  `;

  const seedProjects = `
    INSERT INTO projects (title, role, context, status, team_size, solution_overview, key_achievements, tech_stack, display_order, is_published)
    SELECT * FROM (
      VALUES 
        (
          '{"en": "Unified Enterprise ERP Platform", "ru": "Единая корпоративная ERP-платформа", "uz": "Yagona korporativ ERP platformasi"}'::jsonb, 
          '{"en": "Lead Architect & Senior Engineer", "ru": "Ведущий архитектор и Senior инженер", "uz": "Bosh arxitektor va Senior muhandis"}'::jsonb, 
          '{"en": "Logistics Conglomerate", "ru": "Логистический конгломерат", "uz": "Logistika konglomerati"}'::jsonb,
          '50M+ Daily Requests',
          'Team of 12',
          '{"en": "Consolidated five legacy ERP systems into a unified platform supporting 100K+ concurrent users...", "ru": "Консолидировано пять устаревших ERP-систем в единую платформу...", "uz": "Beshita eski ERP tizimlarini 100 mingdan ortiq faol foydalanuvchilarni qo''llab-quvvatlovchi yagona platformaga birlashtirdi..."}'::jsonb,
          '{"en": ["Increased throughput from 10K to 50M requests/day (5000% improvement).", "Reduced latency by 60% through a multi-layer caching strategy.", "Enabled consolidation that saved $2M+ annually in legacy maintenance costs."], "ru": ["Увеличена пропускная способность с 10K до 50M запросов/день.", "Снижена задержка на 60% за счет многоуровневого кэширования."], "uz": ["O''tkazuvchanlikni kuniga 10 mingdan 50 million so''rovgacha oshirdi.", "Ko''p qatlamli kesh strategiyasi orqali kechikishni 60% ga kamaytirdi."]}'::jsonb,
          '["Node.js", "PostgreSQL", "Kafka", "Kubernetes", "React"]'::jsonb,
          1,
          true
        ),
        (
          '{"en": "Real-Time Payments Gateway", "ru": "Платежный шлюз реального времени", "uz": "Haqiqiy vaqtdagi to''lovlar shlyuzi"}'::jsonb, 
          '{"en": "Senior Backend Engineer & Systems Lead", "ru": "Senior Backend инженер", "uz": "Senior Backend muhandis"}'::jsonb, 
          '{"en": "Fintech Startup", "ru": "Финтех стартап", "uz": "Fintech startapi"}'::jsonb,
          '$200M+ Annual Volume',
          'Team of 6',
          '{"en": "Decomposed a fragile monolithic payments service into isolated, highly-available services...", "ru": "Декомпозирован монолитный платежный сервис на изолированные микросервисы...", "uz": "Zaif monolit to''lovlar xizmati yuqori darajada mavjud izolyatsiya qilingan xizmatlarga ajratildi..."}'::jsonb,
          '{"en": ["Eliminated single points of failure; zero full-service outages in 18 months.", "Passed rigorous banking-partner security audit on first submission.", "Reduced peak-season transaction failure rate from 12% to under 0.1%."], "ru": ["Устранены единые точки отказа.", "Пройден строгий аудит безопасности."], "uz": ["Tizimning to''liq uzilishlari bartaraf etildi.", "Xavfsizlik auditidan birinchi urinishdayoq o''tdi."]}'::jsonb,
          '["Python (FastAPI)", "Redis", "AWS Lambda", "Terraform"]'::jsonb,
          2,
          true
        ),
        (
          '{"en": "Logistics Real-Time Tracking Platform", "ru": "Платформа отслеживания логистики", "uz": "Logistikani real vaqtda kuzatish platformasi"}'::jsonb, 
          '{"en": "Full-Stack Lead", "ru": "Full-Stack Tech Lead", "uz": "Full-Stack Yetakchisi"}'::jsonb, 
          '{"en": "Global Delivery Network", "ru": "Глобальная сеть доставки", "uz": "Global yetkazib berish tarmog''i"}'::jsonb,
          '12M+ Active Users',
          'Team of 8',
          '{"en": "Built a high-performance tracking system processing live GPS event streams...", "ru": "Создана высокопроизводительная система отслеживания GPS-событий в реальном времени...", "uz": "Jonli GPS hodisalari oqimlarini qayta ishlovchi yuqori samarali kuzatish tizimi qurildi..."}'::jsonb,
          '{"en": ["Supported 250K+ peak concurrent WebSocket connections flawlessly.", "Improved ETA accuracy from ~60% to 92%, boosting customer trust.", "Reduced support tickets related to shipment status by 68%."], "ru": ["Поддержка 250K+ одновременных WebSocket соединений.", "Повышена точность ETA с 60% до 92%."], "uz": ["250 mingdan ortiq bir vaqtning o''zida WebSocket ulanishlari qo''llab-quvvatlandi.", "ETA aniqligi 60% dan 92% gacha yaxshilandi."]}'::jsonb,
          '["Next.js", "WebSockets", "MongoDB", "AWS ECS"]'::jsonb,
          3,
          true
        )
    ) AS s(title, role, context, status, team_size, solution_overview, key_achievements, tech_stack, display_order, is_published)
    WHERE NOT EXISTS (
      SELECT 1 FROM projects LIMIT 1
    );
  `;

  try {
    await pool.query(createVisitorsTable);
    console.log('Visitors table created or already exists.');
    
    await pool.query(createVisitEventsTable);
    console.log('Visit events table created or already exists.');
    
    await pool.query(createProjectsTable);
    console.log('Projects table created or already exists.');
    
    await pool.query(alterToJSONB);
    console.log('Altered existing text columns to JSONB if needed.');

    await pool.query(seedProjects);
    console.log('Seed projects inserted (if table was empty).');
    
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await pool.end();
  }
}

runMigration();
