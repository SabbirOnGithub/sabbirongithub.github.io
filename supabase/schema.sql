-- ─────────────────────────────────────────────────────────────────────────────
-- Run this entire file in your Supabase SQL Editor (once)
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Tables ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL UNIQUE,
  order_index  int  DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS topics (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id  uuid REFERENCES categories(id) ON DELETE CASCADE,
  title        text NOT NULL,
  description  text DEFAULT '',
  status       text CHECK (status IN ('planned', 'in-progress', 'done')) DEFAULT 'planned',
  progress     int  DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes        text DEFAULT '',
  resources    text[] DEFAULT '{}',
  order_index  int  DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS topics_updated_at ON topics;
CREATE TRIGGER topics_updated_at
  BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Only authenticated users (you, after login) can read or write.

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics     ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_all_categories" ON categories;
DROP POLICY IF EXISTS "auth_all_topics"     ON topics;

CREATE POLICY "auth_all_categories" ON categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth_all_topics" ON topics
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─── Categories ───────────────────────────────────────────────────────────────

INSERT INTO categories (name, order_index) VALUES
  ('System Design',          1),
  ('Database & Storage',     2),
  ('Architecture & Patterns',3),
  ('DevOps — Foundations',   4),
  ('DevOps — Kubernetes',    5),
  ('DevOps — IaC',           6),
  ('DevOps — GitOps & CI/CD',7),
  ('DevOps — Observability', 8),
  ('DevOps — Security',      9)
ON CONFLICT (name) DO NOTHING;

-- ─── Seed Topics ─────────────────────────────────────────────────────────────

DO $$
DECLARE
  c_sd        uuid;
  c_db        uuid;
  c_arch      uuid;
  c_dfound    uuid;
  c_dk8s      uuid;
  c_diac      uuid;
  c_dcicd     uuid;
  c_dobs      uuid;
  c_dsec      uuid;
BEGIN
  SELECT id INTO c_sd     FROM categories WHERE name = 'System Design';
  SELECT id INTO c_db     FROM categories WHERE name = 'Database & Storage';
  SELECT id INTO c_arch   FROM categories WHERE name = 'Architecture & Patterns';
  SELECT id INTO c_dfound FROM categories WHERE name = 'DevOps — Foundations';
  SELECT id INTO c_dk8s   FROM categories WHERE name = 'DevOps — Kubernetes';
  SELECT id INTO c_diac   FROM categories WHERE name = 'DevOps — IaC';
  SELECT id INTO c_dcicd  FROM categories WHERE name = 'DevOps — GitOps & CI/CD';
  SELECT id INTO c_dobs   FROM categories WHERE name = 'DevOps — Observability';
  SELECT id INTO c_dsec   FROM categories WHERE name = 'DevOps — Security';

  -- System Design
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_sd, 'Scalability Fundamentals',    'Horizontal vs vertical scaling, stateless services, CAP theorem, consistency models.',   'planned',  0, '', ARRAY['Designing Data-Intensive Applications — Kleppmann'], 1),
    (c_sd, 'Load Balancing & Proxies',    'L4/L7 load balancers, reverse proxies, consistent hashing, session affinity.',           'planned',  0, '', '{}', 2),
    (c_sd, 'Caching Strategies',          'CDN, in-process, distributed cache; cache invalidation, eviction policies, stampede.',   'planned',  0, '', ARRAY['AWS Caching Best Practices'], 3),
    (c_sd, 'Message Queues & Streaming',  'Async decoupling with queues (RabbitMQ/SQS) vs streaming (Kafka); ordering & delivery.', 'planned',  0, '', ARRAY['Designing Event-Driven Systems — O''Reilly'], 4),
    (c_sd, 'API Design & Versioning',     'REST best practices, versioning strategies, rate limiting, API gateways.',               'planned',  0, '', '{}', 5),
    (c_sd, 'Distributed Transactions',   'Two-phase commit, Saga pattern, eventual consistency trade-offs.',                       'planned',  0, '', '{}', 6),
    (c_sd, 'Rate Limiting & Throttling',  'Token bucket, leaky bucket, fixed/sliding window algorithms; implementation patterns.',  'planned',  0, '', '{}', 7),
    (c_sd, 'Search & Indexing',           'Full-text search with Elasticsearch, inverted indexes, relevance tuning.',               'planned',  0, '', '{}', 8);

  -- Database & Storage
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_db, 'PostgreSQL Performance Tuning', 'EXPLAIN ANALYZE, indexing strategies, partial/covering indexes, pg_stat_statements.',  'in-progress', 55, 'Focused on partial indexes and slow query analysis with pg_stat_statements.', '{}', 1),
    (c_db, 'PostgreSQL Table Partitioning', 'Range, list, and hash partitioning for large high-traffic tables.',                     'planned',      0, '', '{}', 2),
    (c_db, 'Redis Caching Patterns',        'Cache-aside, write-through, distributed locking, pub/sub, Lua scripting.',             'in-progress', 35, '', '{}', 3),
    (c_db, 'Event Sourcing with EventStoreDB','Event-sourced aggregate design, projection strategies, snapshots.',                  'planned',      0, '', ARRAY['Designing Event-Driven Systems — O''Reilly'], 4);

  -- Architecture & Patterns
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_arch, 'Transactional Outbox Pattern', 'Reliable event publishing alongside DB transactions — eliminates dual-write.',         'done',        100, 'Implemented with PostgreSQL + Quartz.NET polling. Works reliably in production.', '{}', 1),
    (c_arch, 'Domain-Driven Design',         'Bounded contexts, aggregates, value objects, domain events, ubiquitous language.',    'done',        100, 'Applied in multiple projects. Still refining: context mapping and anti-corruption layers.', '{}', 2),
    (c_arch, 'Kafka & Event-Driven Arch',    'Apache Kafka for async microservice communication, partitioning, consumer groups.',   'in-progress',  30, '', ARRAY['Confluent Kafka docs', 'Designing Event-Driven Systems — O''Reilly'], 3),
    (c_arch, 'Saga Pattern',                 'Orchestration vs choreography for distributed transaction management.',               'in-progress',  20, '', '{}', 4),
    (c_arch, 'Vertical Slice Architecture',  'Organizing by feature rather than technical layer (Jimmy Bogard style).',             'planned',       0, '', '{}', 5);

  -- DevOps — Foundations
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dfound, 'Linux & Shell Scripting',      'Bash scripting, systemd, cron jobs, file permissions, process management.',          'planned',      0, '', ARRAY['The Linux Command Line — William Shotts'], 1),
    (c_dfound, 'Networking Fundamentals',      'TCP/IP, DNS, load balancing, reverse proxies, TLS/SSL basics.',                      'planned',      0, '', '{}', 2),
    (c_dfound, 'Docker Advanced',              'Multi-stage builds, layer optimization, security scanning, Docker Compose v2.',      'in-progress', 30, '', ARRAY['Docker Deep Dive — Nigel Poulton'], 3),
    (c_dfound, 'Container Security Basics',    'Running containers as non-root, read-only filesystems, resource limits.',            'planned',      0, '', '{}', 4);

  -- DevOps — Kubernetes
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dk8s, 'Helm Charts',                   'Writing custom Helm charts, values files, templating with Sprig functions.',          'planned',      0, '', ARRAY['Helm Docs', 'Learning Helm — O''Reilly'], 1),
    (c_dk8s, 'Kubernetes RBAC',               'Roles, ClusterRoles, ServiceAccounts, namespace isolation.',                         'planned',      0, '', '{}', 2),
    (c_dk8s, 'HPA & VPA',                     'Horizontal/Vertical Pod Autoscaling, metrics-server, custom metrics.',               'planned',      0, '', '{}', 3),
    (c_dk8s, 'Service Mesh (Istio/Linkerd)',   'Traffic management, mutual TLS, observability without code changes.',                'planned',      0, '', '{}', 4),
    (c_dk8s, 'Custom Resource Definitions',   'CRDs, controllers, and building simple Kubernetes operators.',                       'planned',      0, '', ARRAY['Kubernetes Operators — O''Reilly'], 5);

  -- DevOps — IaC
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_diac, 'Terraform Fundamentals',        'HCL syntax, providers, state management, workspaces, modules.',                      'planned',      0, '', ARRAY['HashiCorp Learn — Terraform', 'Terraform: Up & Running — O''Reilly'], 1),
    (c_diac, 'Terraform with Azure',          'AKS, ACR, VNet, state stored in Azure Blob Storage.',                               'planned',      0, '', '{}', 2),
    (c_diac, 'Pulumi',                        'IaC with real code (C# / Python), compare with Terraform approach.',                 'planned',      0, '', ARRAY['Pulumi Docs'], 3),
    (c_diac, 'Ansible',                       'Configuration management, idempotent playbooks, roles, inventory.',                  'planned',      0, '', '{}', 4);

  -- DevOps — GitOps & CI/CD
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dcicd, 'GitHub Actions Advanced',      'Reusable workflows, composite actions, environments, approvals, matrix builds.',     'done',        100, 'Used heavily. Good with: matrix builds, environment protection rules.', '{}', 1),
    (c_dcicd, 'Azure DevOps Pipelines',       'YAML pipelines, release gates, variable groups, artifact management.',              'in-progress',  40, '', '{}', 2),
    (c_dcicd, 'ArgoCD',                       'GitOps operator for Kubernetes — sync policies, app-of-apps pattern.',              'planned',       0, '', ARRAY['ArgoCD Docs', 'GitOps and Kubernetes — Manning'], 3),
    (c_dcicd, 'GitOps Patterns',              'Pull vs push deployments, environment promotion strategies, drift detection.',      'planned',       0, '', '{}', 4);

  -- DevOps — Observability
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dobs, 'OpenTelemetry in ASP.NET Core', 'OTEL SDK, distributed tracing, metrics, log correlation.',                          'in-progress',  45, 'Sending traces to Jaeger locally. Next: metrics export to Prometheus.', ARRAY['OpenTelemetry Docs', '.NET Observability with OTEL'], 1),
    (c_dobs, 'Prometheus & Grafana',          'PromQL queries, alerting rules, building dashboards for .NET services.',            'planned',       0, '', ARRAY['Prometheus Docs', 'Grafana Labs Docs'], 2),
    (c_dobs, 'EFK Stack',                     'Elasticsearch + Fluentd + Kibana for centralised log aggregation.',                 'planned',       0, '', '{}', 3),
    (c_dobs, 'Azure Monitor & Log Analytics', 'KQL queries, workbooks, metric alerts, Application Insights.',                     'planned',       0, '', ARRAY['Azure Monitor Docs'], 4);

  -- DevOps — Security
  INSERT INTO topics (category_id, title, description, status, progress, notes, resources, order_index) VALUES
    (c_dsec, 'Container Image Scanning',      'Trivy and Snyk scanning in CI pipelines, base image hygiene.',                      'planned',       0, '', ARRAY['Trivy Docs', 'Snyk Docs'], 1),
    (c_dsec, 'HashiCorp Vault',               'Secrets management, dynamic DB credentials, Kubernetes auth method.',              'planned',       0, '', ARRAY['Vault Docs', 'Vault: Definitive Guide — O''Reilly'], 2),
    (c_dsec, 'Kubernetes Network Policies',   'Restricting pod-to-pod communication, ingress/egress rules.',                      'planned',       0, '', '{}', 3),
    (c_dsec, 'SAST/DAST in CI',              'SonarQube for static analysis, OWASP ZAP for dynamic testing in pipelines.',        'planned',       0, '', '{}', 4),
    (c_dsec, 'Azure Key Vault & Managed IDs', 'Secretless authentication, managed identities for Azure resources.',               'planned',       0, '', ARRAY['Azure Key Vault Docs'], 5);

END $$;
