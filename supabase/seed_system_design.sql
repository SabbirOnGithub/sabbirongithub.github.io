-- ─────────────────────────────────────────────────────────────────────────────
-- Run this in Supabase SQL Editor
-- Replaces the flat "System Design" category with 5 phase-based categories
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Remove old flat System Design category (cascades to its topics) ─────────

DELETE FROM categories WHERE name = 'System Design';

-- ─── Push existing categories down to make room at the top ───────────────────

UPDATE categories SET order_index = order_index + 5;

-- ─── Insert 5 System Design phase categories ─────────────────────────────────

INSERT INTO categories (name, order_index) VALUES
  ('SD — CS Foundations',      1),
  ('SD — Design Principles',   2),
  ('SD — Distributed Systems', 3),
  ('SD — Data Architecture',   4),
  ('SD — Security & Cloud',    5)
ON CONFLICT (name) DO NOTHING;

-- ─── Seed topics for each phase ──────────────────────────────────────────────

DO $$
DECLARE
  c_found  uuid;
  c_design uuid;
  c_dist   uuid;
  c_data   uuid;
  c_sec    uuid;
BEGIN
  SELECT id INTO c_found  FROM categories WHERE name = 'SD — CS Foundations';
  SELECT id INTO c_design FROM categories WHERE name = 'SD — Design Principles';
  SELECT id INTO c_dist   FROM categories WHERE name = 'SD — Distributed Systems';
  SELECT id INTO c_data   FROM categories WHERE name = 'SD — Data Architecture';
  SELECT id INTO c_sec    FROM categories WHERE name = 'SD — Security & Cloud';

  -- Phase 1: CS & System Foundations
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_found, 'Data Structures & Algorithms', 'Arrays, trees, graphs, sorting — understand time/space complexity.',              'planned', 0, '', '{}', 1),
    (c_found, 'Operating Systems',            'Processes, threads, memory management, scheduling.',                               'planned', 0, '', '{}', 2),
    (c_found, 'Networking Fundamentals',      'TCP/IP, HTTP/S, DNS, CDN, load balancing, firewalls.',                            'planned', 0, '', '{}', 3),
    (c_found, 'Databases (SQL & NoSQL)',       'ACID, indexing, sharding, replication, CAP theorem.',                            'planned', 0, '', ARRAY['Designing Data-Intensive Applications — Kleppmann'], 4);

  -- Phase 2: System Design Principles
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_design, 'Scalability Patterns',         'Horizontal vs vertical scaling, stateless services, caching layers.',             'planned', 0, '', ARRAY['Designing Data-Intensive Applications — Kleppmann', 'System Design Interview Vol. 1 & 2 — Alex Xu'], 1),
    (c_design, 'High Availability & Fault Tolerance', 'Redundancy, failover, circuit breakers, graceful degradation.',           'planned', 0, '', ARRAY['System Design Interview Vol. 1 & 2 — Alex Xu'], 2),
    (c_design, 'Consistency vs Availability',  'CAP theorem, eventual consistency, strong consistency trade-offs.',               'planned', 0, '', ARRAY['Designing Data-Intensive Applications — Kleppmann'], 3),
    (c_design, 'Rate Limiting & Throttling',   'Token bucket, leaky bucket, protecting services from overload.',                  'planned', 0, '', ARRAY['Grokking the System Design Interview — Educative.io'], 4);

  -- Phase 3: Distributed Systems
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dist, 'Message Queues & Event Streaming', 'Kafka, RabbitMQ — async communication, backpressure, ordering & delivery.',   'planned', 0, '', ARRAY['Designing Event-Driven Systems — O''Reilly'], 1),
    (c_dist, 'Microservices Architecture',     'Service decomposition, API gateways, inter-service communication.',               'planned', 0, '', ARRAY['System Design Interview Vol. 1 & 2 — Alex Xu'], 2),
    (c_dist, 'Consensus & Coordination',       'Paxos, Raft, leader election, distributed transactions.',                        'planned', 0, '', ARRAY['MIT 6.824 Distributed Systems — MIT OpenCourseWare'], 3),
    (c_dist, 'Caching Strategies',             'Redis, Memcached, write-through, write-back, cache invalidation.',                'planned', 0, '', ARRAY['AWS Caching Best Practices'], 4);

  -- Phase 4: Data Architecture
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_data, 'Data Pipelines & ETL',           'Batch vs stream processing, Apache Spark, Flink.',                               'planned', 0, '', '{}', 1),
    (c_data, 'Data Warehousing',               'OLAP vs OLTP, star schema, data lakes, Redshift, BigQuery.',                    'planned', 0, '', '{}', 2),
    (c_data, 'Search Systems',                 'Elasticsearch, Solr — inverted indexes, full-text search design.',               'planned', 0, '', '{}', 3),
    (c_data, 'Time-Series & Analytics',        'InfluxDB, ClickHouse — handling high-frequency data ingestion.',                 'planned', 0, '', '{}', 4);

  -- Phase 5: Security & Cloud Architecture
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_sec, 'Auth & Identity (OAuth2, OIDC)',  'JWT, SSO, zero-trust security models.',                                          'planned', 0, '', '{}', 1),
    (c_sec, 'Cloud-Native Design (AWS/Azure)', 'Serverless, managed services, multi-region architectures.',                      'planned', 0, '', ARRAY['AWS Well-Architected Framework — AWS'], 2),
    (c_sec, 'Infrastructure as Code',          'Terraform, CDK — reproducible and versioned infrastructure.',                    'planned', 0, '', ARRAY['Terraform: Up & Running — O''Reilly'], 3),
    (c_sec, 'Observability at Scale',          'Distributed tracing, structured logging, SLOs/SLAs/SLIs.',                       'planned', 0, '', ARRAY['Grokking the System Design Interview — Educative.io'], 4);

END $$;
