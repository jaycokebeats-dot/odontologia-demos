'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Lock,
  Unlock,
  AlertCircle,
  FileText,
  FolderOpen,
  Eye,
  RefreshCw,
  Download,
  Copy,
  ArrowLeft,
  Sparkles,
  Star
} from 'lucide-react';
import { BlogArticle } from '@/data/dentisalud-data';

const DEFAULT_PIN = 'dentisalud2026';
const CLINIC_PRESET_PHOTOS = [
  { label: 'Consultorio Principal', url: '/images/dentisalud/21_consultorio_principal.jpg' },
  { label: 'Sala de Espera', url: '/images/dentisalud/19_sala_de_espera.jpg' },
  { label: 'Scanner 3D Digital', url: '/images/dentisalud/27_scanner_shinning_3d_tecnolog_a.jpg' },
  { label: 'Atención & Recepción', url: '/images/dentisalud/25_recepcionista_turno.jpg' },
  { label: 'Consulta Integral', url: '/images/dentisalud/41_consulta_integral.png' },
  { label: 'Limpieza Dental', url: '/images/dentisalud/42_limpieza.png' },
  { label: 'Implantes Dentales', url: '/images/dentisalud/43_implantes.png' },
  { label: 'Prótesis Dentales', url: '/images/dentisalud/44_protesis.jpg' },
  { label: 'Blanqueamiento', url: '/images/dentisalud/45_blanqueamiento.png' },
  { label: 'Ortodoncia & Alineadores', url: '/images/dentisalud/46_alineadores.png' },
];

export function AdminBlogManager() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [modalTab, setModalTab] = useState<'editor' | 'preview'>('editor');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formKeyword, setFormKeyword] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState('');

  // Delete confirmation
  const [articleToDelete, setArticleToDelete] = useState<BlogArticle | null>(null);

  // Google Reviews Settings
  const [reviewsCount, setReviewsCount] = useState<number>(93);
  const [reviewsRating, setReviewsRating] = useState<number>(5.0);
  const [reviewsApiKey, setReviewsApiKey] = useState<string>('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);
  const [isSavingReviews, setIsSavingReviews] = useState<boolean>(false);

  // Check stored auth
  useEffect(() => {
    const authSaved = localStorage.getItem('dentisalud_admin_auth');
    if (authSaved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch articles
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) {
        const data = await res.json();
        // Check local storage overrides
        const localOverrides = localStorage.getItem('dentisalud_blog_custom');
        if (localOverrides) {
          try {
            const parsed = JSON.parse(localOverrides);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setArticles(parsed);
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
        setArticles(data);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadGoogleReviews = async () => {
    try {
      const res = await fetch('/api/google-reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.reviewsCount) setReviewsCount(data.reviewsCount);
        if (data.rating) setReviewsRating(data.rating);
      }
    } catch (e) {}
  };

  const handleSaveGoogleReviews = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingReviews(true);
    try {
      const res = await fetch('/api/google-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewsCount: Number(reviewsCount) || 93,
          rating: Number(reviewsRating) || 5.0,
          apiKey: reviewsApiKey.trim() || undefined,
        }),
      });
      if (res.ok) {
        showToast('¡Configuración de Google Reviews actualizada!');
        setIsGoogleModalOpen(false);
      } else {
        showToast('Error al guardar configuración');
      }
    } catch (err) {
      showToast('Error al conectar con el servidor');
    } finally {
      setIsSavingReviews(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles();
      loadGoogleReviews();
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem('dentisalud_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Clave incorrecta. Pista: dentisalud2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dentisalud_admin_auth');
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Prevención');
    setFormKeyword('');
    setFormExcerpt('');
    setFormContent('');
    setFormImage('/images/dentisalud/21_consultorio_principal.jpg');
    setModalTab('editor');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (art: BlogArticle) => {
    setEditingArticle(art);
    setFormTitle(art.title);
    setFormSlug(art.slug);
    setFormCategory(art.category);
    setFormKeyword(art.keyword);
    setFormExcerpt(art.excerpt);
    setFormContent(art.content || '');
    setFormImage(art.image || '/images/dentisalud/21_consultorio_principal.jpg');
    setModalTab('editor');
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingArticle) {
      const generated = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormSlug(generated);
    }
  };

  // Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setFormImage(data.url);
        showToast('Foto cargada exitosamente');
      } else {
        alert(data.error || 'Error al subir la imagen');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error de conexión al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Por favor, ingresá un título para el artículo.');
      return;
    }

    const cleanSlug =
      (formSlug.trim() || formTitle.trim())
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `articulo-${Date.now()}`;

    const payload: BlogArticle = {
      slug: editingArticle ? editingArticle.slug : cleanSlug,
      title: formTitle.trim(),
      category: formCategory.trim() || 'General',
      keyword: formKeyword.trim() || formTitle.trim(),
      excerpt: formExcerpt.trim() || formTitle.trim(),
      content: formContent.trim(),
      image: formImage.trim() || '/images/dentisalud/21_consultorio_principal.jpg',
      date:
        editingArticle?.date ||
        new Date().toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      author: editingArticle?.author || 'DentiSalud Group',
    };

    try {
      const method = editingArticle ? 'PUT' : 'POST';
      const bodyData = payload;

      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();
      if (res.ok) {
        // Update local list
        let updatedList: BlogArticle[];
        if (editingArticle) {
          updatedList = articles.map((a) =>
            a.slug === editingArticle.slug ? { ...a, ...payload } : a
          );
        } else {
          updatedList = [result.article, ...articles];
        }
        setArticles(updatedList);
        localStorage.setItem('dentisalud_blog_custom', JSON.stringify(updatedList));

        setIsModalOpen(false);
        showToast(
          editingArticle
            ? '¡Artículo actualizado con éxito!'
            : '¡Nuevo artículo publicado en el blog!'
        );
      } else {
        alert(result.error || 'Ocurrió un error al guardar');
      }
    } catch (err) {
      console.error('Error saving article:', err);
      // Fallback local save
      const now = new Date();
      const fallbackArticle: BlogArticle = {
        slug: formSlug || 'articulo-' + Date.now(),
        title: formTitle,
        category: formCategory || 'General',
        keyword: formKeyword,
        excerpt: formExcerpt,
        content: formContent,
        image: formImage,
        date: now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
      };
      const updatedList = editingArticle
        ? articles.map((a) => (a.slug === editingArticle.slug ? fallbackArticle : a))
        : [fallbackArticle, ...articles];
      setArticles(updatedList);
      localStorage.setItem('dentisalud_blog_custom', JSON.stringify(updatedList));
      setIsModalOpen(false);
      showToast('Guardado localmente en tu navegador.');
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(articleToDelete.slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      const updated = articles.filter((a) => a.slug !== articleToDelete.slug);
      setArticles(updated);
      localStorage.setItem('dentisalud_blog_custom', JSON.stringify(updated));
      showToast(`Artículo "${articleToDelete.title}" eliminado.`);
    } catch (err) {
      const updated = articles.filter((a) => a.slug !== articleToDelete.slug);
      setArticles(updated);
      localStorage.setItem('dentisalud_blog_custom', JSON.stringify(updated));
      showToast(`Artículo eliminado localmente.`);
    } finally {
      setArticleToDelete(null);
    }
  };

  // Export JSON backup
  const exportBackup = () => {
    const jsonStr = JSON.stringify(articles, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dentisalud_blog_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Archivo de respaldo descargado.');
  };

  // Reset to original baseline
  const resetToBaseline = async () => {
    if (confirm('¿Restaurar los 9 artículos originales del blog? Perderás cambios no exportados.')) {
      localStorage.removeItem('dentisalud_blog_custom');
      await loadArticles();
      showToast('Artículos restaurados al estado inicial.');
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['Todas', ...Array.from(set)];
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory =
        selectedCategory === 'Todas' || a.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.keyword.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // ================= RENDER LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0A2540] flex items-center justify-center text-teal-300 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-extrabold text-[#0A2540]">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-500">
              DentiSalud Group · Gestión de Blog & Contenidos
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-700">Clave de acceso:</label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ingresá la clave de acceso"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/20"
                autoFocus
              />
              <p className="text-[11px] text-slate-400">Pista / clave predeterminada: <strong className="text-slate-600">dentisalud2026</strong></p>
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0A2540] hover:bg-[#051E34] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg hover:shadow-xl"
            >
              Ingresar al panel
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-700 transition flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página web</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= RENDER DASHBOARD =================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0A2540] text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-400/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/dentisalud/logo_dentisalud_white.png"
                alt="DentiSalud Group"
                className="h-8 w-auto bg-[#0A2540] p-1.5 rounded-lg object-contain"
              />
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0A2540] block">
                  DentiSalud Panel
                </span>
                <span className="text-[10px] text-teal-700 font-semibold">
                  Gestión del Blog
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
            >
              <span>Ver Blog Público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-[#051E34] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Artículo</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Cerrar sesión"
            >
              <Unlock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD HERO */}
      <div className="bg-[#0A2540] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#133C63]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                ADMINISTRACIÓN DE CONTENIDOS
              </span>
              <h1 className="text-3xl font-serif font-extrabold mt-1">
                Artículos del Blog
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-light">
                Creá, editá o eliminá publicaciones con fotos y formato. Los cambios se reflejan inmediatamente en la web de DentiSalud Group.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsGoogleModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-xs font-bold text-teal-200 hover:text-white transition flex items-center gap-1.5"
                title="Configurar Google Reviews"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Google Reviews ({reviewsCount})</span>
              </button>

              <button
                onClick={exportBackup}
                className="px-3.5 py-2 rounded-xl bg-[#133C63] hover:bg-[#1a4a75] text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-1.5"
                title="Descargar copia en JSON de todos los artículos"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>

              <button
                onClick={resetToBaseline}
                className="px-3.5 py-2 rounded-xl bg-[#133C63] hover:bg-[#1a4a75] text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-1.5"
                title="Restaurar artículos originales"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* GOOGLE REVIEWS QUICK BAR */}
        <div className="bg-gradient-to-r from-teal-50/80 via-white to-blue-50/80 border border-teal-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#0A2540] flex items-center gap-2">
                <span>Google Maps Reviews:</span>
                <span className="text-amber-600 font-black">{reviewsRating.toFixed(1)} ⭐</span>
                <span className="text-slate-300">·</span>
                <span className="text-teal-800 font-black">{reviewsCount} opiniones</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Contador sincronizado en toda la página web (Hero, Testimonios, Casos y Footer).
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGoogleModalOpen(true)}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl shadow-xs hover:shadow-sm transition flex items-center gap-2 shrink-0"
          >
            <Edit2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Modificar contador / API Key</span>
          </button>
        </div>
        {/* STATS & SEARCH BAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título, palabra clave o extracto..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0A2540] bg-slate-50 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-semibold shrink-0">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'artículo' : 'artículos'}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Categorías:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Cargando artículos...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No se encontraron artículos</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Probá cambiando la búsqueda o agregá una nueva publicación haciendo clic en "+ Nuevo Artículo".
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-[#0A2540] text-white text-xs font-bold px-5 py-2.5 rounded-full"
            >
              <Plus className="w-4 h-4" />
              <span>Crear artículo ahora</span>
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.slug}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={art.image || '/images/dentisalud/21_consultorio_principal.jpg'}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A2540]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {art.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-2">
                    <h3 className="font-serif font-bold text-[#0A2540] text-base group-hover:text-teal-700 transition line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{art.date || 'Reciente'}</span>
                      <span className="text-teal-700 font-semibold">/{art.slug}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(art)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#0A2540] border border-slate-200 text-xs font-bold transition"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Editar</span>
                    </button>

                    <Link
                      href={`/blog/${art.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition"
                      title="Ver en la web pública"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>

                  <button
                    onClick={() => setArticleToDelete(art)}
                    className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                    title="Eliminar artículo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0A2540] text-white flex items-center justify-between border-b border-[#133C63]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {editingArticle ? 'Modificar Artículo' : 'Crear Nuevo Artículo'}
                  </h3>
                  <p className="text-[11px] text-teal-200 font-light">
                    DentiSalud Group · Gestor de Artículos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tabs: Editor vs Preview */}
                <div className="bg-[#133C63] p-1 rounded-xl flex items-center text-xs">
                  <button
                    type="button"
                    onClick={() => setModalTab('editor')}
                    className={`px-3 py-1 rounded-lg font-bold transition ${
                      modalTab === 'editor' ? 'bg-white text-[#0A2540]' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`px-3 py-1 rounded-lg font-bold transition ${
                      modalTab === 'preview' ? 'bg-white text-[#0A2540]' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Vista Previa
                  </button>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {modalTab === 'preview' ? (
                /* PREVIEW TAB */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
                      {formCategory || 'General'}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A2540]">
                      {formTitle || 'Título del artículo'}
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                      Publicado por DentiSalud Group · Belgrano, CABA
                    </p>
                  </div>

                  {formImage && (
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={formImage} alt={formTitle} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 italic">
                    {formExcerpt || 'Resumen del artículo para las tarjetas del blog.'}
                  </div>

                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                    {formContent || 'El contenido completo del artículo aparecerá aquí.'}
                  </div>
                </div>
              ) : (
                /* EDITOR FORM */
                <form id="article-form" onSubmit={handleSaveArticle} className="space-y-5">
                  {/* Título */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Título del Artículo *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Ej: Ventajas del blanqueamiento dental sin sensibilidad"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  {/* Slug & Categoría */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Slug (URL amigable)</label>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="ej: ventajas-blanqueamiento-dental"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-600 focus:outline-none focus:border-[#0A2540] font-mono bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Categoría</label>
                      <input
                        type="text"
                        list="categories-list"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        placeholder="Alternativas, Costos, Prevención..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540]"
                      />
                      <datalist id="categories-list">
                        <option value="Alternativas" />
                        <option value="Costos" />
                        <option value="Primera visita" />
                        <option value="Prevención" />
                        <option value="Estética dental" />
                        <option value="Implantes" />
                        <option value="Ortodoncia" />
                      </datalist>
                    </div>
                  </div>

                  {/* Palabra clave SEO */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Palabra clave (SEO)</label>
                    <input
                      type="text"
                      value={formKeyword}
                      onChange={(e) => setFormKeyword(e.target.value)}
                      placeholder="Ej: blanqueamiento dental belgrano"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  {/* Extracto */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Extracto / Resumen corto</label>
                    <textarea
                      rows={2}
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      placeholder="Breve descripción que se muestra en la card del blog (1 o 2 oraciones)..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  {/* IMAGEN DESTACADA */}
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#0A2540] flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-teal-700" />
                        <span>Foto Destacada del Artículo</span>
                      </label>
                      {formImage && (
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className="text-[11px] font-bold text-red-600 hover:underline"
                        >
                          Quitar foto
                        </button>
                      )}
                    </div>

                    {/* Image Preview & Upload Controls */}
                    <div className="grid sm:grid-cols-12 gap-4 items-center">
                      {formImage ? (
                        <div className="sm:col-span-4 relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-300 bg-white">
                          <img src={formImage} alt="Previa" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="sm:col-span-4 aspect-[16/10] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[11px]">
                          <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                          <span>Sin foto asignada</span>
                        </div>
                      )}

                      <div className="sm:col-span-8 space-y-2">
                        {/* File Upload Button */}
                        <div>
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs transition">
                            <Upload className="w-3.5 h-3.5 text-teal-600" />
                            <span>{uploadingImage ? 'Subiendo...' : 'Subir foto desde tu dispositivo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              disabled={uploadingImage}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Or URL input */}
                        <div>
                          <input
                            type="text"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            placeholder="O pegar URL de imagen directamente..."
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        {/* Quick selector of clinic photos */}
                        <div className="pt-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            O elegir foto de la clínica:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {CLINIC_PRESET_PHOTOS.slice(0, 5).map((preset) => (
                              <button
                                key={preset.url}
                                type="button"
                                onClick={() => setFormImage(preset.url)}
                                className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
                                  formImage === preset.url
                                    ? 'bg-[#0A2540] text-white border-[#0A2540]'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido Completo */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Contenido Completo del Artículo</label>
                      <span className="text-[11px] text-slate-400">Podés usar subtítulos con ### y listas con -</span>
                    </div>
                    <textarea
                      rows={8}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Escribí aquí el desarrollo completo del artículo..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#0A2540] leading-relaxed"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                form="article-form"
                className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-[#051E34] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition"
              >
                <Check className="w-4 h-4 text-teal-300" />
                <span>{editingArticle ? 'Guardar Cambios' : 'Publicar Artículo'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                ¿Eliminar este artículo?
              </h3>
              <p className="text-xs text-slate-600">
                Estás por eliminar <strong>"{articleToDelete.title}"</strong>. Esta acción quitará el artículo del blog público.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= GOOGLE REVIEWS MODAL ================= */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 rounded-2xl text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Google Reviews
                  </h3>
                  <p className="text-xs text-slate-500">Contador y sincronización</p>
                </div>
              </div>
              <button
                onClick={() => setIsGoogleModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGoogleReviews} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Cantidad de Reseñas (Contador visible):
                </label>
                <input
                  type="number"
                  min="1"
                  value={reviewsCount}
                  onChange={(e) => setReviewsCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Actualmente en Google Maps hay 93 reseñas. Podés actualizar este número cuando sumes más con 1 click.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Calificación Promedio (Estrellas):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={reviewsRating}
                  onChange={(e) => setReviewsRating(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700 block mb-1">
                  Google Places API Key (Opcional):
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={reviewsApiKey}
                  onChange={(e) => setReviewsApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#0A2540]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Si tenés una clave de Google Cloud Places API, pegala acá para que se actualice sola automáticamente. Si no tenés una, podés cambiar el número arriba de forma manual.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingReviews}
                  className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#051E34] text-white font-bold transition shadow-md flex items-center gap-1.5"
                >
                  {isSavingReviews ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Guardar cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
