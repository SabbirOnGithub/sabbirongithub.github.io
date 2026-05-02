-- ─────────────────────────────────────────────────────────────────────────────
-- Run this in Supabase SQL Editor to remove old categories and add System Design
-- Topics are deleted automatically via ON DELETE CASCADE
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Remove old categories (cascades to their topics) ────────────────────────

DELETE FROM categories WHERE name IN ('.NET & C#', 'Languages');

-- ─── Fix order_index for remaining categories ────────────────────────────────

UPDATE categories SET order_index = 1 WHERE name = 'Database & Storage';
UPDATE categories SET order_index = 2 WHERE name = 'Architecture & Patterns';
UPDATE categories SET order_index = 3 WHERE name = 'DevOps — Foundations';
UPDATE categories SET order_index = 4 WHERE name = 'DevOps — Kubernetes';
UPDATE categories SET order_index = 5 WHERE name = 'DevOps — IaC';
UPDATE categories SET order_index = 6 WHERE name = 'DevOps — GitOps & CI/CD';
UPDATE categories SET order_index = 7 WHERE name = 'DevOps — Observability';
UPDATE categories SET order_index = 8 WHERE name = 'DevOps — Security';

-- ─── Add System Design category ──────────────────────────────────────────────

INSERT INTO categories (name, order_index)
VALUES ('System Design', 0)
ON CONFLICT (name) DO UPDATE SET order_index = 0;

-- ─── Seed System Design topics ───────────────────────────────────────────────

DO $$
DECLARE
  c_sd uuid;
BEGIN
  SELECT id INTO c_sd FROM categories WHERE name = 'System Design';

  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_sd, 'Scalability Fundamentals',   'Horizontal vs vertical scaling, stateless services, CAP theorem, consistency models.',   'planned', 0, '', ARRAY['Designing Data-Intensive Applications — Kleppmann'], 1),
    (c_sd, 'Load Balancing & Proxies',   'L4/L7 load balancers, reverse proxies, consistent hashing, session affinity.',           'planned', 0, '', '{}', 2),
    (c_sd, 'Caching Strategies',         'CDN, in-process, distributed cache; cache invalidation, eviction policies, stampede.',   'planned', 0, '', ARRAY['AWS Caching Best Practices'], 3),
    (c_sd, 'Message Queues & Streaming', 'Async decoupling with queues (RabbitMQ/SQS) vs streaming (Kafka); ordering & delivery.', 'planned', 0, '', ARRAY['Designing Event-Driven Systems — O''Reilly'], 4),
    (c_sd, 'API Design & Versioning',    'REST best practices, versioning strategies, rate limiting, API gateways.',               'planned', 0, '', '{}', 5),
    (c_sd, 'Distributed Transactions',  'Two-phase commit, Saga pattern, eventual consistency trade-offs.',                       'planned', 0, '', '{}', 6),
    (c_sd, 'Rate Limiting & Throttling', 'Token bucket, leaky bucket, fixed/sliding window algorithms; implementation patterns.',  'planned', 0, '', '{}', 7),
    (c_sd, 'Search & Indexing',          'Full-text search with Elasticsearch, inverted indexes, relevance tuning.',               'planned', 0, '', '{}', 8);
END $$;
