import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Category, Topic, Status } from '../lib/supabase'
import './Learn.css'

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CYCLE: Record<Status, Status> = {
  planned: 'in-progress',
  'in-progress': 'done',
  done: 'planned',
}

const STATUS_CFG: Record<Status, { label: string; color: string; bg: string }> = {
  done:          { label: 'Done',        color: '#3fb950', bg: 'rgba(63,185,80,0.12)' },
  'in-progress': { label: 'In Progress', color: '#58a6ff', bg: 'rgba(88,166,255,0.12)' },
  planned:       { label: 'Planned',     color: '#6e7681', bg: 'rgba(110,118,129,0.12)' },
}

// ─── TopicCard ────────────────────────────────────────────────────────────────

function TopicCard({ topic, onUpdate, onDelete }: {
  topic: Topic
  onUpdate: (id: string, updates: Partial<Topic>) => Promise<void>
  onDelete: (id: string) => void
}) {
  const [progress, setProgress] = useState(topic.progress)
  const [notes, setNotes] = useState(topic.notes)
  const [editingNotes, setEditingNotes] = useState(false)
  const cfg = STATUS_CFG[topic.status]

  return (
    <div className={`lab-card status-${topic.status}`}>
      <div className="lab-card-top">
        <h3 className="lab-card-title">{topic.title}</h3>
        <div className="lab-card-actions">
          <button
            className="status-btn"
            style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color + '50' }}
            onClick={() => onUpdate(topic.id, { status: STATUS_CYCLE[topic.status] })}
            title="Click to cycle status"
          >
            {cfg.label}
          </button>
          <button className="delete-btn" onClick={() => onDelete(topic.id)} title="Delete">✕</button>
        </div>
      </div>

      {topic.description && <p className="lab-card-desc">{topic.description}</p>}

      <div className="progress-row">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          className="progress-slider"
          onChange={(e) => setProgress(+e.target.value)}
          onMouseUp={() => onUpdate(topic.id, { progress })}
          onTouchEnd={() => onUpdate(topic.id, { progress })}
        />
        <span className="progress-pct">{progress}%</span>
      </div>

      <div
        className={`lab-notes ${editingNotes ? 'editing' : ''}`}
        onClick={() => !editingNotes && setEditingNotes(true)}
      >
        {editingNotes ? (
          <textarea
            className="notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => { onUpdate(topic.id, { notes }); setEditingNotes(false) }}
            autoFocus
            placeholder="Add notes…"
            rows={3}
          />
        ) : (
          <p className={notes ? 'notes-text' : 'notes-placeholder'}>
            {notes || '+ Add notes…'}
          </p>
        )}
      </div>

      {topic.resources?.length > 0 && (
        <div className="lab-resources">
          {topic.resources.map((r, i) => <span className="resource-chip" key={i}>{r}</span>)}
        </div>
      )}
    </div>
  )
}

// ─── AddTopicForm ─────────────────────────────────────────────────────────────

function AddTopicForm({ categoryId, onAdd, onCancel }: {
  categoryId: string
  onAdd: (t: Omit<Topic, 'id'>) => Promise<void>
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    await onAdd({
      category_id: categoryId,
      title: title.trim(),
      description: description.trim(),
      status: 'planned',
      progress: 0,
      notes: '',
      resources: [],
      order_index: 9999,
    })
    setSubmitting(false)
    onCancel()
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic title *"
        required
        autoFocus
      />
      <input
        className="add-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description (optional)"
      />
      <div className="add-form-footer">
        <button type="submit" className="btn-save" disabled={submitting || !title.trim()}>
          {submitting ? 'Adding…' : 'Add Topic'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

// ─── Lab Dashboard ────────────────────────────────────────────────────────────

export default function Learn() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [activeTab, setActiveTab] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [{ data: cats }, { data: tops }] = await Promise.all([
        supabase.from('categories').select('*').order('order_index'),
        supabase.from('topics').select('*').order('order_index'),
      ])
      if (cats?.length) { setCategories(cats); setActiveTab(cats[0].id) }
      if (tops) setTopics(tops)
      setLoading(false)
    }
    loadData()
  }, [])

  const updateTopic = useCallback(async (id: string, updates: Partial<Topic>) => {
    const { error } = await supabase.from('topics').update(updates).eq('id', id)
    if (!error) setTopics(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const deleteTopic = useCallback((id: string) => {
    if (!confirm('Delete this topic?')) return
    supabase.from('topics').delete().eq('id', id).then(({ error }) => {
      if (!error) setTopics(prev => prev.filter(t => t.id !== id))
    })
  }, [])

  const addTopic = useCallback(async (topic: Omit<Topic, 'id'>) => {
    const { data, error } = await supabase.from('topics').insert(topic).select().single()
    if (!error && data) setTopics(prev => [...prev, data])
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/lab/login')
  }

  const visibleTopics = topics.filter(t => t.category_id === activeTab)
  const done = topics.filter(t => t.status === 'done').length
  const inProgress = topics.filter(t => t.status === 'in-progress').length
  const planned = topics.filter(t => t.status === 'planned').length

  if (loading) {
    return <div className="lab-loading"><span>Loading…</span></div>
  }

  return (
    <div className="learn">

      {/* ── Header ── */}
      <header className="learn-header">
        <div className="learn-header-inner">
          <div className="lab-toprow">
            <div>
              <h1 className="learn-title">
                <span className="learn-title-accent">~/</span>Learning Lab
              </h1>
              <p className="learn-subtitle">Track, manage, and advance your learning.</p>
            </div>
            <button className="signout-btn" onClick={signOut}>Sign Out</button>
          </div>
          <div className="stats-bar">
            {[
              { val: done,       label: 'Completed',  color: '#3fb950' },
              { val: inProgress, label: 'In Progress', color: '#58a6ff' },
              { val: planned,    label: 'Planned',     color: '#6e7681' },
              { val: topics.length, label: 'Total',   color: 'var(--text-h)' },
            ].map(s => (
              <div className="lstat" key={s.label}>
                <span className="lstat-val" style={{ color: s.color }}>{s.val}</span>
                <span className="lstat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Category Tabs ── */}
      <div className="cat-tabs-wrap">
        <div className="cat-tabs">
          {categories.map(cat => {
            const count = topics.filter(t => t.category_id === cat.id).length
            const doneCount = topics.filter(t => t.category_id === cat.id && t.status === 'done').length
            return (
              <button
                key={cat.id}
                className={`cat-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(cat.id); setShowAddForm(false) }}
              >
                {cat.name}
                <span className="cat-badge">{doneCount}/{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Topics ── */}
      <main className="lab-main">
        <div className="topics-grid">
          {visibleTopics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onUpdate={updateTopic}
              onDelete={deleteTopic}
            />
          ))}

          {showAddForm
            ? <AddTopicForm categoryId={activeTab} onAdd={addTopic} onCancel={() => setShowAddForm(false)} />
            : (
              <button className="add-topic-btn" onClick={() => setShowAddForm(true)}>
                <span className="add-plus">+</span>
                <span>Add Topic</span>
              </button>
            )
          }
        </div>
      </main>

    </div>
  )
}
