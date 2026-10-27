'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Sparkles,
  BookOpen,
  Settings,
  Plus,
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
  RefreshCw,
  Star,
  Eye,
  SlidersHorizontal,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  EyeOff,
  DollarSign,
  Database,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Instagram,
  Share2,
  Users,
  UserPlus
} from 'lucide-react';
import { useSiteData } from '@/components/dentisalud/useSiteData';
import { BeforeAfterCard } from '@/components/dentisalud/BeforeAfterCard';
import { AdminBlogManager } from '@/components/admin/AdminBlogManager';
import { TreatmentDetail, PatientReview, TeamMember } from '@/data/dentisalud-data';
import { BeforeAfterCase } from '@/data/dentisalud-photos';

const ADMIN_CREDENTIAL = 'dentisalud2710';

const CLINIC_PRESET_PHOTOS = [
  { label: '37 - Dra. Nathaly Martínez', url: '/images/dentisalud/37_nathaly.png' },
  { label: '38 - Dr. Rasec Guariman', url: '/images/dentisalud/38_rasec.png' },
  { label: '39 - Dra. Norma Oviedo', url: '/images/dentisalud/39_norma.png' },
  { label: '40 - Dr. Isael Cova', url: '/images/dentisalud/40_isael.png' },
  { label: 'Recepción y Atención', url: '/images/dentisalud/20_recepcionista.jpg' },
  { label: '41 - Consulta Integral', url: '/images/dentisalud/41_consulta_integral.png' },
  { label: '42 - Limpieza Dental', url: '/images/dentisalud/42_limpieza.png' },
  { label: '43 - Implantes Dentales', url: '/images/dentisalud/43_implantes.png' },
  { label: '44 - Prótesis Dentales', url: '/images/dentisalud/44_protesis.jpg' },
  { label: '45 - Blanqueamiento', url: '/images/dentisalud/45_blanqueamiento.png' },
  { label: '46 - Alineadores Invisibles', url: '/images/dentisalud/46_alineadores.png' },
  { label: 'Consultorio Principal', url: '/images/dentisalud/21_consultorio_principal.jpg' },
  { label: 'Sala de Espera', url: '/images/dentisalud/19_sala_de_espera.jpg' },
  { label: 'Diseño de Sonrisa Hero', url: '/images/dentisalud/diseno_sonrisa_hero.jpg' },
  { label: 'Endodoncia Hero', url: '/images/dentisalud/endodoncia_hero.jpg' },
  { label: 'ATM & Bruxismo Hero', url: '/images/dentisalud/atm_bruxismo_hero.jpg' },
  { label: 'Odontopediatría Hero', url: '/images/dentisalud/odontopediatria_hero.jpg' },
  { label: 'Carillas Disilicato', url: '/images/dentisalud/14_carillas_de_disilicato_de_litio_despu_s.jpg' },
  { label: 'Blanqueamiento Resultado', url: '/images/dentisalud/31_blanqueamiento_despu_s.jpg' },
];

export function AdminGeneralDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'tratamientos' | 'casos' | 'equipo' | 'blog' | 'config'>('tratamientos');
  const [casosSubTab, setCasosSubTab] = useState<'casos' | 'testimonios'>('casos');
  const [equipoSubTab, setEquipoSubTab] = useState<'profesionales' | 'nosotrosPage'>('profesionales');

  // Site Data from Hook (Supabase Cloud + LocalStorage)
  const {
    siteData,
    info,
    treatments,
    featuredPhotos,
    cases,
    reviews,
    team,
    nosotrosInfo,
    loading,
    updateData,
    resetData,
    refreshData,
  } = useSiteData();

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string>('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Check stored authentication
  useEffect(() => {
    const auth = localStorage.getItem('dentisalud_admin_auth');
    if (auth === ADMIN_CREDENTIAL) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === ADMIN_CREDENTIAL && passwordInput.trim() === ADMIN_CREDENTIAL) {
      setIsAuthenticated(true);
      localStorage.setItem('dentisalud_admin_auth', ADMIN_CREDENTIAL);
      setLoginError('');
      showToast('¡Bienvenido al Panel de Control de DentiSalud!');
    } else {
      setLoginError('Usuario o contraseña incorrectos. Verificá los datos e intentá nuevamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dentisalud_admin_auth');
  };

  // ================= TRATAMIENTOS STATE & HANDLERS =================
  const [editingTreatment, setEditingTreatment] = useState<TreatmentDetail | null>(null);
  const [tTitle, setTTitle] = useState('');
  const [tCategory, setTCategory] = useState<'prevencion' | 'rehabilitacion' | 'estetica' | 'especialidades'>('prevencion');
  const [tShortDesc, setTShortDesc] = useState('');
  const [tHeroH1, setTHeroH1] = useState('');
  const [tHeroBajada, setTHeroBajada] = useState('');
  const [tPhotoUrl, setTPhotoUrl] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSavingTreatment, setIsSavingTreatment] = useState(false);

  const openEditTreatment = (t: TreatmentDetail) => {
    setEditingTreatment(t);
    setTTitle(t.title);
    setTCategory(t.category);
    setTShortDesc(t.shortDescription);
    setTHeroH1(t.heroH1 || '');
    setTHeroBajada(t.heroBajada || '');
    setTPhotoUrl(featuredPhotos[t.slug] || '/images/dentisalud/21_consultorio_principal.jpg');
  };

  const handleSaveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTreatment) return;
    setIsSavingTreatment(true);

    const updatedTreatments = treatments.map((item) => {
      if (item.slug === editingTreatment.slug) {
        return {
          ...item,
          title: tTitle,
          category: tCategory,
          shortDescription: tShortDesc,
          heroH1: tHeroH1,
          heroBajada: tHeroBajada,
        };
      }
      return item;
    });

    const updatedPhotos = {
      ...featuredPhotos,
      [editingTreatment.slug]: tPhotoUrl,
    };

    const res = await updateData({
      treatments: updatedTreatments,
      featuredPhotos: updatedPhotos,
    });

    setIsSavingTreatment(false);
    if (res.success) {
      setEditingTreatment(null);
      showToast(`¡Tratamiento "${tTitle}" actualizado en toda la web!`);
    } else {
      showToast('Error al guardar en Supabase. Intentá de nuevo.');
    }
  };

  // ================= CASOS ANTES Y DESPUÉS STATE & HANDLERS =================
  const [editingCase, setEditingCase] = useState<BeforeAfterCase | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<BeforeAfterCase | null>(null);

  const [cTitle, setCTitle] = useState('');
  const [cCategory, setCCategory] = useState<'estetica' | 'protesis' | 'caries' | 'blanqueamiento' | 'carillas'>('estetica');
  const [cTreatmentSlug, setCTreatmentSlug] = useState('diseno-de-sonrisa');
  const [cDescription, setCDescription] = useState('');
  const [cBefore, setCBefore] = useState('');
  const [cAfter, setCAfter] = useState('');
  const [isUploadingBefore, setIsUploadingBefore] = useState(false);
  const [isUploadingAfter, setIsUploadingAfter] = useState(false);
  const [isSavingCase, setIsSavingCase] = useState(false);

  const openCreateCase = () => {
    setEditingCase(null);
    setCTitle('');
    setCCategory('estetica');
    setCTreatmentSlug('diseno-de-sonrisa');
    setCDescription('');
    setCBefore('/images/dentisalud/1_gingivoplastia_antes.jpg');
    setCAfter('/images/dentisalud/1_gingivoplastia_despu_s.jpg');
    setIsCaseModalOpen(true);
  };

  const openEditCase = (c: BeforeAfterCase) => {
    setEditingCase(c);
    setCTitle(c.title);
    setCCategory(c.category);
    setCTreatmentSlug(c.treatmentSlug);
    setCDescription(c.description);
    setCBefore(c.before);
    setCAfter(c.after);
    setIsCaseModalOpen(true);
  };

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle.trim() || !cBefore || !cAfter) {
      alert('Por favor completá el título y las dos fotos (Antes y Después).');
      return;
    }

    setIsSavingCase(true);
    const matchedTreatment = treatments.find((t) => t.slug === cTreatmentSlug);
    const treatmentName = matchedTreatment ? matchedTreatment.title : 'Tratamiento';

    const casePayload: BeforeAfterCase = {
      id: editingCase ? editingCase.id : `case-${Date.now()}`,
      title: cTitle,
      category: cCategory,
      treatmentSlug: cTreatmentSlug,
      treatmentName,
      description: cDescription,
      before: cBefore,
      after: cAfter,
    };

    let updatedCases: BeforeAfterCase[];
    if (editingCase) {
      updatedCases = cases.map((item) => (item.id === editingCase.id ? casePayload : item));
    } else {
      updatedCases = [casePayload, ...cases];
    }

    const res = await updateData({ cases: updatedCases });
    setIsSavingCase(false);
    if (res.success) {
      setIsCaseModalOpen(false);
      showToast(editingCase ? '¡Caso actualizado con éxito!' : '¡Nuevo caso de Antes y Después agregado!');
    } else {
      showToast('Error al guardar caso en Supabase.');
    }
  };

  const confirmDeleteCase = async () => {
    if (!caseToDelete) return;
    const updatedCases = cases.filter((item) => item.id !== caseToDelete.id);
    const res = await updateData({ cases: updatedCases });
    if (res.success) {
      setCaseToDelete(null);
      showToast(`Caso "${caseToDelete.title}" eliminado.`);
    }
  };

  // ================= TESTIMONIOS STATE & HANDLERS =================
  const [editingReview, setEditingReview] = useState<PatientReview | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<PatientReview | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'todas' | 'visibles' | 'ocultas'>('todas');

  const [rName, setRName] = useState('');
  const [rTreatment, setRTreatment] = useState('');
  const [rStars, setRStars] = useState(5);
  const [rComment, setRComment] = useState('');
  const [rDate, setRDate] = useState('Hace 1 semana');
  const [rActive, setRActive] = useState(true);
  const [isSavingReview, setIsSavingReview] = useState(false);

  const openCreateReview = () => {
    setEditingReview(null);
    setRName('');
    setRTreatment('Consulta & Tratamiento');
    setRStars(5);
    setRComment('');
    setRDate('Hace 1 semana');
    setRActive(true);
    setIsReviewModalOpen(true);
  };

  const openEditReview = (r: PatientReview) => {
    setEditingReview(r);
    setRName(r.name);
    setRTreatment(r.treatment);
    setRStars(r.stars);
    setRComment(r.comment);
    setRDate(r.date);
    setRActive(r.active !== false);
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rName.trim() || !rComment.trim()) {
      alert('Por favor completá el nombre y el comentario.');
      return;
    }

    setIsSavingReview(true);
    const payload: PatientReview = {
      id: editingReview?.id || `rev-${Date.now()}`,
      name: rName,
      treatment: rTreatment || 'Atención Odontológica',
      stars: rStars,
      comment: rComment,
      date: rDate || 'Reciente',
      verified: true,
      active: rActive,
    };

    let updatedReviews: PatientReview[];
    if (editingReview) {
      updatedReviews = reviews.map((rev) => (rev.name === editingReview.name && rev.comment === editingReview.comment ? payload : rev));
    } else {
      updatedReviews = [payload, ...reviews];
    }

    const res = await updateData({ reviews: updatedReviews });
    setIsSavingReview(false);
    if (res.success) {
      setIsReviewModalOpen(false);
      showToast(editingReview ? '¡Testimonio actualizado!' : '¡Nuevo testimonio publicado!');
    }
  };

  const toggleReviewVisibility = async (index: number) => {
    const target = reviews[index];
    if (!target) return;
    const currentStatus = target.active !== false;
    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...target, active: !currentStatus };
    const res = await updateData({ reviews: updatedReviews });
    if (res.success) {
      showToast(!currentStatus ? `Reseña de ${target.name} visible en la web.` : `Reseña de ${target.name} ocultada de la web.`);
    }
  };

  const moveReview = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === reviews.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedReviews = [...reviews];
    const temp = updatedReviews[index];
    updatedReviews[index] = updatedReviews[targetIndex];
    updatedReviews[targetIndex] = temp;

    const res = await updateData({ reviews: updatedReviews });
    if (res.success) {
      showToast(`Orden actualizado (#${targetIndex + 1})`);
    }
  };

  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;
    const updatedReviews = reviews.filter((r) => !(r.name === reviewToDelete.name && r.comment === reviewToDelete.comment));
    const res = await updateData({ reviews: updatedReviews });
    if (res.success) {
      setReviewToDelete(null);
      showToast('Testimonio eliminado.');
    }
  };

  // ================= EQUIPO Y NOSOTROS STATE & HANDLERS =================
  const [memberFilter, setMemberFilter] = useState<'todas' | 'visibles' | 'ocultas'>('todas');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [isSavingMember, setIsSavingMember] = useState<boolean>(false);
  const [isUploadingTeamPhoto, setIsUploadingTeamPhoto] = useState<boolean>(false);

  // Form fields for Member
  const [tmName, setTmName] = useState<string>('');
  const [tmRole, setTmRole] = useState<string>('');
  const [tmBio, setTmBio] = useState<string>('');
  const [tmPhoto, setTmPhoto] = useState<string>('');
  const [tmTags, setTmTags] = useState<string>('');
  const [tmInstagram, setTmInstagram] = useState<string>('');
  const [tmInstagramHandle, setTmInstagramHandle] = useState<string>('');
  const [tmActive, setTmActive] = useState<boolean>(true);

  // Form fields for Nosotros Page Texts
  const [isSavingNosotrosTexts, setIsSavingNosotrosTexts] = useState<boolean>(false);
  const [isUploadingNosotrosHero, setIsUploadingNosotrosHero] = useState<boolean>(false);
  const [nHeroTitle, setNHeroTitle] = useState<string>(nosotrosInfo?.heroTitle || '');
  const [nHeroBadge, setNHeroBadge] = useState<string>(nosotrosInfo?.heroBadge || '');
  const [nHeroText, setNHeroText] = useState<string>(nosotrosInfo?.heroText || '');
  const [nHeroPhoto, setNHeroPhoto] = useState<string>(nosotrosInfo?.heroPhoto || '');
  const [nBadge1, setNBadge1] = useState<string>(nosotrosInfo?.badge1 || '');
  const [nBadge2, setNBadge2] = useState<string>(nosotrosInfo?.badge2 || '');
  const [nBadge3, setNBadge3] = useState<string>(nosotrosInfo?.badge3 || '');
  const [nTeamBadge, setNTeamBadge] = useState<string>(nosotrosInfo?.teamSectionBadge || '');
  const [nTeamTitle, setNTeamTitle] = useState<string>(nosotrosInfo?.teamSectionTitle || '');
  const [nTeamSubtitle, setNTeamSubtitle] = useState<string>(nosotrosInfo?.teamSectionSubtitle || '');

  useEffect(() => {
    if (nosotrosInfo) {
      setNHeroTitle(nosotrosInfo.heroTitle || '');
      setNHeroBadge(nosotrosInfo.heroBadge || '');
      setNHeroText(nosotrosInfo.heroText || '');
      setNHeroPhoto(nosotrosInfo.heroPhoto || '');
      setNBadge1(nosotrosInfo.badge1 || '');
      setNBadge2(nosotrosInfo.badge2 || '');
      setNBadge3(nosotrosInfo.badge3 || '');
      setNTeamBadge(nosotrosInfo.teamSectionBadge || '');
      setNTeamTitle(nosotrosInfo.teamSectionTitle || '');
      setNTeamSubtitle(nosotrosInfo.teamSectionSubtitle || '');
    }
  }, [nosotrosInfo]);

  const openCreateMember = () => {
    setEditingMember(null);
    setTmName('');
    setTmRole('');
    setTmBio('');
    setTmPhoto('/images/dentisalud/37_nathaly.png');
    setTmTags('Odontología Integral, Estética Dental');
    setTmInstagram('');
    setTmInstagramHandle('');
    setTmActive(true);
    setIsTeamModalOpen(true);
  };

  const openEditMember = (m: TeamMember) => {
    setEditingMember(m);
    setTmName(m.name || '');
    setTmRole(m.role || '');
    setTmBio(m.bio || '');
    setTmPhoto(m.photo || '/images/dentisalud/37_nathaly.png');
    setTmTags((m.tags || []).join(', '));
    setTmInstagram(m.instagram || '');
    setTmInstagramHandle(m.instagramHandle || '');
    setTmActive(m.active !== false);
    setIsTeamModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmName.trim() || !tmRole.trim()) {
      alert('Por favor completá el nombre y el cargo/especialidad.');
      return;
    }

    setIsSavingMember(true);
    const parsedTags = tmTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: TeamMember = {
      id: editingMember?.id || `member-${Date.now()}`,
      name: tmName.trim(),
      role: tmRole.trim(),
      bio: tmBio.trim(),
      photo: tmPhoto.trim(),
      tags: parsedTags,
      instagram: tmInstagram.trim() || undefined,
      instagramHandle: tmInstagramHandle.trim() || undefined,
      active: tmActive,
      order: editingMember?.order ?? team.length,
    };

    let updatedTeam: TeamMember[];
    if (editingMember) {
      updatedTeam = team.map((mem) =>
        mem.id === editingMember.id || mem.name === editingMember.name ? payload : mem
      );
    } else {
      updatedTeam = [...team, payload];
    }

    const res = await updateData({ team: updatedTeam });
    setIsSavingMember(false);
    if (res.success) {
      setIsTeamModalOpen(false);
      showToast(editingMember ? '¡Profesional actualizado!' : '¡Nuevo profesional agregado al equipo!');
    }
  };

  const toggleMemberVisibility = async (index: number) => {
    const target = team[index];
    if (!target) return;
    const currentStatus = target.active !== false;
    const updatedTeam = [...team];
    updatedTeam[index] = { ...target, active: !currentStatus };
    const res = await updateData({ team: updatedTeam });
    if (res.success) {
      showToast(!currentStatus ? `${target.name} visible en la web.` : `${target.name} ocultado/a.`);
    }
  };

  const moveMember = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === team.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedTeam = [...team];
    const temp = updatedTeam[index];
    updatedTeam[index] = updatedTeam[targetIndex];
    updatedTeam[targetIndex] = temp;

    const res = await updateData({ team: updatedTeam });
    if (res.success) {
      showToast(`Orden del equipo actualizado.`);
    }
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;
    const updatedTeam = team.filter((m) => m.name !== memberToDelete.name && m.id !== memberToDelete.id);
    const res = await updateData({ team: updatedTeam });
    if (res.success) {
      setMemberToDelete(null);
      showToast(`Profesional eliminado.`);
    }
  };

  const handleSaveNosotrosInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingNosotrosTexts(true);
    const updatedNosotros = {
      heroBadge: nHeroBadge.trim(),
      heroTitle: nHeroTitle.trim(),
      heroText: nHeroText.trim(),
      heroPhoto: nHeroPhoto.trim(),
      badge1: nBadge1.trim(),
      badge2: nBadge2.trim(),
      badge3: nBadge3.trim(),
      teamSectionBadge: nTeamBadge.trim(),
      teamSectionTitle: nTeamTitle.trim(),
      teamSectionSubtitle: nTeamSubtitle.trim(),
    };
    const res = await updateData({ nosotrosInfo: updatedNosotros });
    setIsSavingNosotrosTexts(false);
    if (res.success) {
      showToast('¡Textos de la página Nosotros guardados con éxito!');
    } else {
      showToast('Error al guardar textos de Nosotros.');
    }
  };

  // ================= CONFIGURACIÓN GENERAL STATE & HANDLERS =================
  const [cfgConsultationPrice, setCfgConsultationPrice] = useState<string>(info.consultationPrice || '$40.000');
  const [cfgReviewsCount, setCfgReviewsCount] = useState<number>(info.reviewsCount || 93);
  const [cfgRating, setCfgRating] = useState<number>(info.rating || 5.0);
  const [cfgPhone, setCfgPhone] = useState(info.phone || '+54 9 11 2877-9912');
  const [cfgWhatsapp, setCfgWhatsapp] = useState(info.whatsappGeneral || '');
  const [cfgInstagram, setCfgInstagram] = useState(info.socials?.instagram || 'https://www.instagram.com/dentisaludgroup/');
  const [cfgTiktok, setCfgTiktok] = useState(info.socials?.tiktok || 'https://www.tiktok.com/@dentisalud.arg');
  const [cfgAddress, setCfgAddress] = useState(info.address || 'Cdad. de la Paz 1965, Belgrano, CABA');
  const [cfgApiKey, setCfgApiKey] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  useEffect(() => {
    if (info) {
      setCfgConsultationPrice(info.consultationPrice || '$40.000');
      setCfgReviewsCount(info.reviewsCount || 93);
      setCfgRating(info.rating || 5.0);
      setCfgPhone(info.phone || '+54 9 11 2877-9912');
      setCfgWhatsapp(info.whatsappGeneral || '');
      setCfgInstagram(info.socials?.instagram || 'https://www.instagram.com/dentisaludgroup/');
      setCfgTiktok(info.socials?.tiktok || 'https://www.tiktok.com/@dentisalud.arg');
      setCfgAddress(info.address || 'Cdad. de la Paz 1965, Belgrano, CABA');
    }
  }, [info]);

  const handleSaveGeneralConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);

    const updatedInfo = {
      ...info,
      consultationPrice: cfgConsultationPrice.trim() || '$40.000',
      reviewsCount: Number(cfgReviewsCount) || 93,
      rating: Number(cfgRating) || 5.0,
      phone: cfgPhone,
      whatsappGeneral: cfgWhatsapp,
      address: cfgAddress,
      socials: {
        ...info.socials,
        instagram: cfgInstagram,
        tiktok: cfgTiktok,
      },
    };

    // Save to Supabase
    const res = await updateData({ info: updatedInfo });

    // Also trigger google-reviews endpoint update
    try {
      await fetch('/api/google-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewsCount: Number(cfgReviewsCount) || 93,
          rating: Number(cfgRating) || 5.0,
          apiKey: cfgApiKey.trim() || undefined,
        }),
      });
    } catch (e) {}

    setIsSavingConfig(false);
    if (res.success) {
      showToast('¡Configuración general y Google Reviews guardados en Supabase!');
    } else {
      showToast('Error al guardar configuración.');
    }
  };

  // Upload file helper
  const handleFileUpload = async (
    file: File,
    target: 'treatment' | 'before' | 'after' | 'team' | 'nosotrosHero'
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    if (target === 'treatment') setIsUploadingPhoto(true);
    if (target === 'before') setIsUploadingBefore(true);
    if (target === 'after') setIsUploadingAfter(true);
    if (target === 'team') setIsUploadingTeamPhoto(true);
    if (target === 'nosotrosHero') setIsUploadingNosotrosHero(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (target === 'treatment') setTPhotoUrl(data.url);
        if (target === 'before') setCBefore(data.url);
        if (target === 'after') setCAfter(data.url);
        if (target === 'team') setTmPhoto(data.url);
        if (target === 'nosotrosHero') setNHeroPhoto(data.url);
        showToast('Foto subida con éxito.');
      } else {
        alert(data.error || 'Error al subir la imagen');
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen');
    } finally {
      if (target === 'treatment') setIsUploadingPhoto(false);
      if (target === 'before') setIsUploadingBefore(false);
      if (target === 'after') setIsUploadingAfter(false);
      if (target === 'team') setIsUploadingTeamPhoto(false);
      if (target === 'nosotrosHero') setIsUploadingNosotrosHero(false);
    }
  };

  // ================= RENDER LOGIN IF NOT AUTHENTICATED =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#0D2F4F] to-[#06192B] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 text-center border border-teal-500/20">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0A2540] flex items-center justify-center text-teal-300 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-serif font-extrabold text-[#0A2540]">
              Panel de Control
            </h1>
            <p className="text-xs text-slate-500">
              DentiSalud Group · Administración General
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Usuario:</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ingresá tu usuario"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/20"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Contraseña:</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresá tu contraseña"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/20"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0A2540] hover:bg-[#051E34] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-700 transition flex items-center justify-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Volver a la página web</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= RENDER GENERAL DASHBOARD =================
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
                  DentiSalud Group
                </span>
                <span className="text-[10px] text-teal-700 font-semibold flex items-center gap-1">
                  <Database className="w-3 h-3 text-teal-600" />
                  <span>Panel General · Supabase Cloud</span>
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
            >
              <span>Ver Web en Vivo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition"
              title="Cerrar sesión"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto py-2.5">
            <button
              onClick={() => setActiveTab('tratamientos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === 'tratamientos'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Tratamientos ({treatments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('casos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === 'casos'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Casos & Testimonios ({cases.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('equipo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === 'equipo'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Equipo & Nosotros ({team.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Artículos del Blog</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración General</span>
            </button>
          </nav>
        </div>
      </header>

      {/* DASHBOARD HERO BANNER */}
      <div className="bg-[#0A2540] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-[#133C63]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>BASE DE DATOS ACTIVA EN LA NUBE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold mt-1">
              {activeTab === 'tratamientos' && 'Gestión de Tratamientos & Fotos'}
              {activeTab === 'casos' && 'Casos Clínicos & Testimonios'}
              {activeTab === 'equipo' && 'Equipo Profesional & Página Nosotros'}
              {activeTab === 'blog' && 'Gestión de Artículos del Blog'}
              {activeTab === 'config' && 'Configuración General & Redes'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-light">
              Cualquier cambio guardado se sincroniza automáticamente en la nube (Supabase) y se refleja en tiempo real en la página web.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="px-3.5 py-2 rounded-xl bg-[#133C63] hover:bg-[#1a4a75] text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-1.5"
              title="Recargar datos desde Supabase"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sincronizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* ================= TAB 1: TRATAMIENTOS ================= */}
        {activeTab === 'tratamientos' && (
          <div className="space-y-6">
            {/* QUICK CONSULTATION PRICE BANNER */}
            <div className="bg-gradient-to-r from-teal-50/90 via-white to-blue-50/90 border border-teal-100 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
                    <span>Precio de la Consulta Integral:</span>
                    <span className="text-teal-700 font-extrabold text-lg">{info.consultationPrice || '$40.000'}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Se sincroniza automáticamente en las preguntas frecuentes (FAQ) de Inicio y en la página de Consulta Integral.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={cfgConsultationPrice}
                  onChange={(e) => setCfgConsultationPrice(e.target.value)}
                  placeholder="$40.000"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-white w-full sm:w-36 focus:outline-none focus:border-[#0A2540]"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const res = await updateData({
                      info: { ...info, consultationPrice: cfgConsultationPrice.trim() || '$40.000' }
                    });
                    if (res.success) showToast('¡Precio de la consulta actualizado en toda la web!');
                  }}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white text-xs font-bold rounded-xl shadow-xs transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-teal-300" />
                  <span>Guardar Precio</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                  Tratamientos de DentiSalud Group
                </h2>
                <p className="text-xs text-slate-500">
                  Podés cambiar la foto principal, el título, la descripción de la card y el texto del encabezado de cada uno.
                </p>
              </div>
            </div>

            {/* Grid of Treatments */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments.map((t) => {
                const photo = featuredPhotos[t.slug] || '/images/dentisalud/21_consultorio_principal.jpg';
                return (
                  <div
                    key={t.slug}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={photo}
                          alt={t.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0A2540]/80 backdrop-blur-xs text-teal-300 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                          {t.category}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 space-y-2">
                        <h3 className="text-base font-serif font-bold text-[#0A2540]">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {t.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
                      <Link
                        href={`/tratamientos/${t.slug}`}
                        target="_blank"
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                      >
                        <span>Ver página</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <button
                        onClick={() => openEditTreatment(t)}
                        className="px-4 py-2 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-teal-300" />
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CASOS & TESTIMONIOS ================= */}
        {activeTab === 'casos' && (
          <div className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex gap-2">
                <button
                  onClick={() => setCasosSubTab('casos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    casosSubTab === 'casos'
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Casos Antes y Después ({cases.length})</span>
                </button>

                <button
                  onClick={() => setCasosSubTab('testimonios')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    casosSubTab === 'testimonios'
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Testimonios de Pacientes ({reviews.length})</span>
                </button>
              </div>

              {casosSubTab === 'casos' ? (
                <button
                  onClick={openCreateCase}
                  className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Caso</span>
                </button>
              ) : (
                <button
                  onClick={openCreateReview}
                  className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Testimonio</span>
                </button>
              )}
            </div>

            {/* CASOS SUBTAB CONTENT */}
            {casosSubTab === 'casos' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Cada caso cuenta con el efecto slider interactivo antes y después. Al agregar o quitar casos, las tarjetas se mantienen siempre perfectamente centradas en la web.
                </p>

                {/* Cases Grid (Centering enforced) */}
                <div className="flex flex-wrap justify-center gap-6">
                  {cases.map((c) => (
                    <div
                      key={c.id}
                      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden"
                    >
                      {/* Interactive Card Preview */}
                      <BeforeAfterCard caseData={c} />

                      {/* Card Edit and Delete Controls */}
                      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Categoría: {c.category}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditCase(c)}
                            className="p-2 rounded-xl text-slate-600 hover:text-[#0A2540] hover:bg-slate-200 transition"
                            title="Editar caso"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCaseToDelete(c)}
                            className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                            title="Eliminar caso"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIOS SUBTAB CONTENT */}
            {casosSubTab === 'testimonios' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500">Filtrar:</span>
                    <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      <button
                        onClick={() => setReviewFilter('todas')}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          reviewFilter === 'todas'
                            ? 'bg-white text-[#0A2540] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Todas ({reviews.length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('visibles')}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          reviewFilter === 'visibles'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        Visibles en la web ({reviews.filter((r) => r.active !== false).length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('ocultas')}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          reviewFilter === 'ocultas'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        Ocultas ({reviews.filter((r) => r.active === false).length})
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    💡 Podés elegir cuáles se ven con el botón <span className="font-bold text-emerald-700">Visible</span> y cambiar el orden con las flechas <span className="font-bold">↑ ↓</span>.
                  </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews
                    .map((r, originalIndex) => ({ review: r, originalIndex }))
                    .filter(({ review }) => {
                      if (reviewFilter === 'visibles') return review.active !== false;
                      if (reviewFilter === 'ocultas') return review.active === false;
                      return true;
                    })
                    .map(({ review: r, originalIndex }) => {
                      const isVisible = r.active !== false;
                      return (
                        <div
                          key={r.id || originalIndex}
                          className={`bg-white rounded-3xl p-6 border transition flex flex-col justify-between shadow-xs hover:shadow-md relative ${
                            isVisible ? 'border-slate-200' : 'border-slate-200 bg-slate-50/70 opacity-75'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Card Top: Position Badge & Visibility Toggle */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-lg bg-[#0A2540] text-teal-300 font-mono text-[11px] font-black">
                                  #{originalIndex + 1}
                                </span>
                                <div className="flex gap-0.5 text-amber-400">
                                  {[...Array(r.stars || 5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                  ))}
                                </div>
                              </div>

                              {/* Quick Toggle Button */}
                              <button
                                type="button"
                                onClick={() => toggleReviewVisibility(originalIndex)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                                  isVisible
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-slate-200 text-slate-600 border border-slate-300 hover:bg-slate-300'
                                }`}
                                title={isVisible ? 'Hacé clic para ocultar de la web' : 'Hacé clic para mostrar en la web'}
                              >
                                {isVisible ? (
                                  <>
                                    <Eye className="w-3 h-3 text-emerald-600" />
                                    <span>Visible en web</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3 text-slate-500" />
                                    <span>Oculta</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <p className="text-xs text-slate-700 italic leading-relaxed line-clamp-4">
                              "{r.comment}"
                            </p>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-bold text-[#0A2540]">{r.name}</h4>
                                <span className="text-[11px] text-teal-700 block">{r.treatment}</span>
                              </div>
                              <span className="text-[10px] text-slate-400">{r.date}</span>
                            </div>
                          </div>

                          {/* Footer Actions: Reorder and Edit/Delete */}
                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                            {/* Reorder Buttons */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={originalIndex === 0}
                                onClick={() => moveReview(originalIndex, 'up')}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                                title="Subir orden"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={originalIndex === reviews.length - 1}
                                onClick={() => moveReview(originalIndex, 'down')}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                                title="Bajar orden"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openEditReview(r)}
                                className="p-2 rounded-xl text-slate-600 hover:text-[#0A2540] hover:bg-slate-100 transition cursor-pointer"
                                title="Editar reseña"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setReviewToDelete(r)}
                                className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                                title="Eliminar reseña"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: EQUIPO Y NOSOTROS ================= */}
        {activeTab === 'equipo' && (
          <div className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-xs gap-3">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setEquipoSubTab('profesionales')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    equipoSubTab === 'profesionales'
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Profesionales del Equipo ({team.length})</span>
                </button>

                <button
                  onClick={() => setEquipoSubTab('nosotrosPage')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    equipoSubTab === 'nosotrosPage'
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Textos e Identidad "Nosotros"</span>
                </button>
              </div>

              {equipoSubTab === 'profesionales' && (
                <button
                  onClick={openCreateMember}
                  className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Profesional</span>
                </button>
              )}
            </div>

            {/* SUBTAB 1: PROFESIONALES DEL EQUIPO */}
            {equipoSubTab === 'profesionales' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Gestioná a cada integrante del equipo médico. Podés cambiar la foto, cargo, biografía, redes sociales o dar de alta/baja a cualquier miembro.
                  </p>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => setMemberFilter('todas')}
                      className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                        memberFilter === 'todas' ? 'bg-white text-[#0A2540] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Todos ({team.length})
                    </button>
                    <button
                      onClick={() => setMemberFilter('visibles')}
                      className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                        memberFilter === 'visibles' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Visibles ({team.filter((m) => m.active !== false).length})
                    </button>
                    <button
                      onClick={() => setMemberFilter('ocultas')}
                      className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                        memberFilter === 'ocultas' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Ocultos ({team.filter((m) => m.active === false).length})
                    </button>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  {team
                    .map((member, index) => ({ member, index }))
                    .filter(({ member }) => {
                      if (memberFilter === 'visibles') return member.active !== false;
                      if (memberFilter === 'ocultas') return member.active === false;
                      return true;
                    })
                    .map(({ member, index }) => (
                      <div
                        key={member.id || member.name}
                        className={`bg-white rounded-3xl p-5 border transition flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                          member.active !== false
                            ? 'border-slate-200'
                            : 'border-slate-200 bg-slate-50/70 opacity-75'
                        }`}
                      >
                        <div className="flex gap-4 items-start">
                          {/* Doctor Portrait Thumbnail */}
                          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <img
                              src={member.photo || '/images/dentisalud/37_nathaly.png'}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute top-1.5 left-1.5 bg-[#0A2540]/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                              #{index + 1}
                            </div>
                          </div>

                          {/* Doctor Information */}
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-serif font-bold text-[#0A2540] truncate">
                                {member.name}
                              </h3>
                              {member.active !== false ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                                  Visible
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                  <EyeOff className="w-3 h-3" />
                                  Oculto
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-semibold text-teal-800 line-clamp-2">
                              {member.role}
                            </p>

                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                              {member.bio}
                            </p>

                            {/* Tags & Instagram */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {member.tags?.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-semibold bg-[#EAF6F6] text-[#0A2540] px-2 py-0.5 rounded-md border border-[#D5E8E8]"
                                >
                                  {tag}
                                </span>
                              ))}
                              {member.tags && member.tags.length > 3 && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  +{member.tags.length - 3}
                                </span>
                              )}
                              {member.instagram && (
                                <a
                                  href={member.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-600 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-md hover:bg-pink-100 transition"
                                >
                                  <Instagram className="w-2.5 h-2.5" />
                                  <span>{member.instagramHandle || 'IG'}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          {/* Order Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveMember(index, 'up')}
                              disabled={index === 0}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                              title="Subir prioridad en carrusel"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveMember(index, 'down')}
                              disabled={index === team.length - 1}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                              title="Bajar prioridad en carrusel"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[11px] text-slate-400 font-medium ml-1">
                              Posición #{index + 1}
                            </span>
                          </div>

                          {/* Edit, Toggle, Delete */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleMemberVisibility(index)}
                              className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                member.active !== false
                                  ? 'text-teal-700 hover:bg-teal-50'
                                  : 'text-slate-400 hover:bg-slate-200'
                              }`}
                              title={member.active !== false ? 'Ocultar en la web' : 'Hacer visible'}
                            >
                              {member.active !== false ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => openEditMember(member)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-[#EAF6F6] text-[#0A2540] hover:text-teal-900 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Editar</span>
                            </button>

                            <button
                              onClick={() => setMemberToDelete(member)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                              title="Eliminar profesional"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SUBTAB 2: TEXTOS DE LA PÁGINA NOSOTROS */}
            {equipoSubTab === 'nosotrosPage' && (
              <form onSubmit={handleSaveNosotrosInfo} className="space-y-6">
                {/* HERO DE NOSOTROS */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                        Encabezado & Hero de la Página "Nosotros"
                      </h2>
                      <p className="text-xs text-slate-500">
                        Configurá el título principal, el párrafo de presentación y la foto destacada.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Badge Superior
                      </label>
                      <input
                        type="text"
                        value={nHeroBadge}
                        onChange={(e) => setNHeroBadge(e.target.value)}
                        placeholder="NOSOTROS · DENTISALUD GROUP"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Título Principal (H1)
                      </label>
                      <input
                        type="text"
                        value={nHeroTitle}
                        onChange={(e) => setNHeroTitle(e.target.value)}
                        placeholder="Cuidamos tu sonrisa con empatía y profesionalismo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Párrafo de Presentación
                    </label>
                    <textarea
                      rows={3}
                      value={nHeroText}
                      onChange={(e) => setNHeroText(e.target.value)}
                      placeholder="En DentiSalud Group, la Dra. Nathaly Martínez..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Foto Destacada Hero de Nosotros */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <label className="block text-xs font-bold text-slate-700">
                      Foto Destacada del Hero (Derecha)
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-white border border-slate-300 shrink-0 shadow-xs">
                        <img
                          src={nHeroPhoto || '/images/dentisalud/20_recepcionista.jpg'}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <label className="px-3 py-1.5 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {isUploadingNosotrosHero ? 'Subiendo...' : 'Subir archivo de mi PC'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload(e.target.files[0], 'nosotrosHero');
                                }
                              }}
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 whitespace-nowrap">
                            O elegir preset:
                          </span>
                          <select
                            onChange={(e) => {
                              if (e.target.value) setNHeroPhoto(e.target.value);
                            }}
                            className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none w-full"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Seleccionar foto de clínica...
                            </option>
                            {CLINIC_PRESET_PHOTOS.map((p) => (
                              <option key={p.url} value={p.url}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="text"
                          value={nHeroPhoto}
                          onChange={(e) => setNHeroPhoto(e.target.value)}
                          placeholder="URL de foto..."
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 Puntos de Confianza */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-slate-700">
                      3 Puntos de Confianza / Sellos (Pills inferiores)
                    </label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block mb-1">
                          Sello 1:
                        </span>
                        <input
                          type="text"
                          value={nBadge1}
                          onChange={(e) => setNBadge1(e.target.value)}
                          placeholder="Clínica habilitada..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block mb-1">
                          Sello 2:
                        </span>
                        <input
                          type="text"
                          value={nBadge2}
                          onChange={(e) => setNBadge2(e.target.value)}
                          placeholder="Equipo interdisciplinario"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block mb-1">
                          Sello 3:
                        </span>
                        <input
                          type="text"
                          value={nBadge3}
                          onChange={(e) => setNBadge3(e.target.value)}
                          placeholder="+5.000 sonrisas transformadas"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ENCABEZADOS DE LA SECCIÓN DE EQUIPO */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                        Títulos de la Sección "Nuestro Equipo"
                      </h2>
                      <p className="text-xs text-slate-500">
                        Encabezados que introducen el carrusel de profesionales en la página Nosotros.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Badge Superior de Sección
                      </label>
                      <input
                        type="text"
                        value={nTeamBadge}
                        onChange={(e) => setNTeamBadge(e.target.value)}
                        placeholder="PROFESIONALES DE LA SALUD BUCAL"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Título de la Sección (H2)
                      </label>
                      <input
                        type="text"
                        value={nTeamTitle}
                        onChange={(e) => setNTeamTitle(e.target.value)}
                        placeholder="Nuestro equipo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subtítulo Descriptivo
                    </label>
                    <input
                      type="text"
                      value={nTeamSubtitle}
                      onChange={(e) => setNTeamSubtitle(e.target.value)}
                      placeholder="Un equipo interdisciplinario coordinado..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Submit button for Nosotros texts */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingNosotrosTexts}
                    className="px-6 py-3 rounded-full bg-[#0A2540] hover:bg-[#051E34] text-white text-xs sm:text-sm font-bold shadow-lg transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-300" />
                    <span>
                      {isSavingNosotrosTexts ? 'Guardando en Supabase...' : 'Guardar Textos de Nosotros'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================= TAB 4: BLOG ================= */}
        {activeTab === 'blog' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <AdminBlogManager embedded={true} />
          </div>
        )}

        {/* ================= TAB 4: CONFIGURACIÓN GENERAL ================= */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <form onSubmit={handleSaveGeneralConfig} className="space-y-6">
              {/* PRECIO DE LA CONSULTA */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                      Precio de la Consulta Odontológica Integral
                    </h2>
                    <p className="text-xs text-slate-500">
                      Modificá el valor mostrado en las preguntas frecuentes (FAQ) y en la página de consulta
                    </p>
                  </div>
                </div>

                <div className="max-w-md space-y-1">
                  <label className="text-xs font-bold text-slate-700">Valor / Precio visible:</label>
                  <input
                    type="text"
                    value={cfgConsultationPrice}
                    onChange={(e) => setCfgConsultationPrice(e.target.value)}
                    placeholder="$40.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                  />
                  <p className="text-[11px] text-slate-400">
                    Ejemplo: <strong className="text-slate-600">$40.000</strong> o <strong className="text-slate-600">ARS $45.000</strong>. Al guardar se actualiza en toda la web en vivo.
                  </p>
                </div>
              </div>

              {/* GOOGLE REVIEWS SECTION */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                      Google Maps Reviews
                    </h2>
                    <p className="text-xs text-slate-500">
                      Control del contador de opiniones y sincronización en tiempo real
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Cantidad de Reseñas:</label>
                    <input
                      type="number"
                      min="1"
                      value={cfgReviewsCount}
                      onChange={(e) => setCfgReviewsCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                    <p className="text-[11px] text-slate-400">
                      Aparece en el Hero, Testimonios y Casos de la web.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Calificación Promedio:</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={cfgRating}
                      onChange={(e) => setCfgRating(parseFloat(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                    <p className="text-[11px] text-slate-400">
                      Puntaje de estrellas mostrado (generalmente 5.0).
                    </p>
                  </div>

                  <div className="sm:col-span-2 space-y-1 pt-2">
                    <label className="text-xs font-bold text-slate-700">Google Places API Key (Opcional):</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={cfgApiKey}
                      onChange={(e) => setCfgApiKey(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                    <p className="text-[11px] text-slate-400">
                      Si tenés una API Key de Google Cloud habilitada, pegala aquí para auto-sincronización horaria.
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT & SOCIAL MEDIA SECTION */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#0A2540]">
                      Contacto & Redes Sociales
                    </h2>
                    <p className="text-xs text-slate-500">
                      Teléfono, WhatsApp, Instagram y TikTok oficiales
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Teléfono visible:</label>
                    <input
                      type="text"
                      value={cfgPhone}
                      onChange={(e) => setCfgPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Enlace WhatsApp de Turnos:</label>
                    <input
                      type="text"
                      value={cfgWhatsapp}
                      onChange={(e) => setCfgWhatsapp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Instagram URL:</label>
                    <input
                      type="text"
                      value={cfgInstagram}
                      onChange={(e) => setCfgInstagram(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">TikTok URL:</label>
                    <input
                      type="text"
                      value={cfgTiktok}
                      onChange={(e) => setCfgTiktok(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Dirección del Consultorio:</label>
                    <input
                      type="text"
                      value={cfgAddress}
                      onChange={(e) => setCfgAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm('¿Estás seguro de restablecer toda la configuración y casos a los valores predeterminados?')) {
                      await resetData();
                      showToast('Configuración restaurada.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition"
                >
                  Restablecer valores de fábrica
                </button>

                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className="px-6 py-3 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-2"
                >
                  {isSavingConfig ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
                  ) : (
                    <Check className="w-4 h-4 text-teal-300" />
                  )}
                  <span>Guardar Toda la Configuración</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ================= MODAL EDITAR TRATAMIENTO ================= */}
      {editingTreatment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A2540]">
                  Editar Tratamiento: {editingTreatment.title}
                </h3>
                <p className="text-xs text-slate-500">Slug: {editingTreatment.slug}</p>
              </div>
              <button
                onClick={() => setEditingTreatment(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTreatment} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Título del Tratamiento:</label>
                  <input
                    type="text"
                    value={tTitle}
                    onChange={(e) => setTTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Categoría:</label>
                  <select
                    value={tCategory}
                    onChange={(e) => setTCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0A2540]"
                  >
                    <option value="prevencion">Salud y Prevención</option>
                    <option value="rehabilitacion">Rehabilitación Oral</option>
                    <option value="estetica">Estética Dental</option>
                    <option value="especialidades">Otras Especialidades</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Descripción Corta (Card del catálogo):</label>
                <textarea
                  rows={2}
                  value={tShortDesc}
                  onChange={(e) => setTShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0A2540]"
                  required
                />
              </div>

              {/* FOTO PRINCIPAL SELECTOR */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">
                  Imagen Principal del Tratamiento:
                </label>

                {/* Current Image Preview */}
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <img
                    src={tPhotoUrl || '/images/dentisalud/21_consultorio_principal.jpg'}
                    alt="Preview"
                    className="w-20 h-16 object-cover rounded-xl border border-slate-300 shadow-2xs"
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={tPhotoUrl}
                      onChange={(e) => setTPhotoUrl(e.target.value)}
                      placeholder="URL de la imagen"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                    />

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold cursor-pointer border border-teal-200 flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>{isUploadingPhoto ? 'Subiendo...' : 'Subir archivo de mi PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'treatment');
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preset selector */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-semibold">O elegí una foto rápida de la clínica:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
                    {CLINIC_PRESET_PHOTOS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTPhotoUrl(p.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition ${
                          tPhotoUrl === p.url
                            ? 'bg-[#0A2540] text-white border-[#0A2540] font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* HERO PAGE TEXTS */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Título Principal (H1 en la página del tratamiento):</label>
                  <input
                    type="text"
                    value={tHeroH1}
                    onChange={(e) => setTHeroH1(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bajada / Párrafo Introductorio en la página:</label>
                  <textarea
                    rows={2}
                    value={tHeroBajada}
                    onChange={(e) => setTHeroBajada(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTreatment(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingTreatment}
                  className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#051E34] text-white font-bold transition shadow-md flex items-center gap-1.5"
                >
                  {isSavingTreatment ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Guardar Tratamiento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CREAR / EDITAR CASO ================= */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A2540]">
                  {editingCase ? 'Editar Caso Clínico' : 'Nuevo Caso Clínico Antes y Después'}
                </h3>
                <p className="text-xs text-slate-500">
                  Las fotos se presentarán con el slider interactivo para los pacientes.
                </p>
              </div>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCase} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Título del Caso:</label>
                  <input
                    type="text"
                    value={cTitle}
                    onChange={(e) => setCTitle(e.target.value)}
                    placeholder="Ej: Blanqueamiento Dental LED en Consultorio"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0A2540]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Categoría:</label>
                  <select
                    value={cCategory}
                    onChange={(e) => setCCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  >
                    <option value="estetica">Diseño de sonrisa</option>
                    <option value="carillas">Carillas</option>
                    <option value="blanqueamiento">Blanqueamiento</option>
                    <option value="protesis">Prótesis & Coronas</option>
                    <option value="caries">Arreglo de Caries</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tratamiento Asociado:</label>
                  <select
                    value={cTreatmentSlug}
                    onChange={(e) => setCTreatmentSlug(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  >
                    {treatments.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Descripción del Caso:</label>
                  <input
                    type="text"
                    value={cDescription}
                    onChange={(e) => setCDescription(e.target.value)}
                    placeholder="Breve descripción del resultado obtenido"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* FOTOS ANTES Y DESPUÉS */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                {/* FOTO ANTES */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <label className="font-bold text-slate-800 block text-xs">
                    Foto 1: Estado Inicial (Antes)
                  </label>
                  <div className="relative aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden">
                    <img src={cBefore} alt="Antes" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    value={cBefore}
                    onChange={(e) => setCBefore(e.target.value)}
                    placeholder="URL de foto Antes"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-[11px] font-mono"
                    required
                  />
                  <label className="w-full px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold cursor-pointer border border-teal-200 flex items-center justify-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>{isUploadingBefore ? 'Subiendo...' : 'Subir foto Antes de mi PC'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'before');
                        }
                      }}
                    />
                  </label>
                </div>

                {/* FOTO DESPUÉS */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <label className="font-bold text-slate-800 block text-xs">
                    Foto 2: Resultado Final (Después)
                  </label>
                  <div className="relative aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden">
                    <img src={cAfter} alt="Después" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    value={cAfter}
                    onChange={(e) => setCAfter(e.target.value)}
                    placeholder="URL de foto Después"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-[11px] font-mono"
                    required
                  />
                  <label className="w-full px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold cursor-pointer border border-teal-200 flex items-center justify-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>{isUploadingAfter ? 'Subiendo...' : 'Subir foto Después de mi PC'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'after');
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* LIVE SLIDER PREVIEW */}
              {cBefore && cAfter && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="font-bold text-slate-700 block">
                    Vista Previa Interactiva del Slider (Probá mover la barra):
                  </span>
                  <div className="max-w-md mx-auto">
                    <BeforeAfterCard
                      caseData={{
                        id: 'preview',
                        title: cTitle || 'Caso de prueba',
                        category: cCategory,
                        treatmentSlug: cTreatmentSlug,
                        treatmentName: 'Vista previa',
                        description: cDescription,
                        before: cBefore,
                        after: cAfter,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCaseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingCase}
                  className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#051E34] text-white font-bold transition shadow-md flex items-center gap-1.5"
                >
                  {isSavingCase ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Guardar Caso</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CREAR / EDITAR TESTIMONIO ================= */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0A2540]">
                {editingReview ? 'Editar Testimonio' : 'Nuevo Testimonio'}
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nombre del Paciente:</label>
                <input
                  type="text"
                  value={rName}
                  onChange={(e) => setRName(e.target.value)}
                  placeholder="Ej: Mariana Silva"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tratamiento:</label>
                  <input
                    type="text"
                    value={rTreatment}
                    onChange={(e) => setRTreatment(e.target.value)}
                    placeholder="Ej: Diseño de Sonrisa"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Estrellas:</label>
                  <select
                    value={rStars}
                    onChange={(e) => setRStars(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4)</option>
                    <option value={3}>⭐⭐⭐ (3)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Fecha aproximada:</label>
                <input
                  type="text"
                  value={rDate}
                  onChange={(e) => setRDate(e.target.value)}
                  placeholder="Ej: Hace 2 semanas"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Comentario del Paciente:</label>
                <textarea
                  rows={3}
                  value={rComment}
                  onChange={(e) => setRComment(e.target.value)}
                  placeholder="Comentario sobre la atención recibida..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modal-review-active"
                  checked={rActive}
                  onChange={(e) => setRActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0A2540] border-slate-300 cursor-pointer"
                />
                <label htmlFor="modal-review-active" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Mostrar esta reseña en la página web (Visible)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingReview}
                  className="px-5 py-2 rounded-xl bg-[#0A2540] text-white font-bold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CONFIRM DELETE CASO ================= */}
      {caseToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              ¿Eliminar caso "{caseToDelete.title}"?
            </h3>
            <p className="text-xs text-slate-500">
              Esta acción quitará el caso de la web pública y de la sección de Casos & Testimonios.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setCaseToDelete(null)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteCase}
                className="px-5 py-2 rounded-full bg-red-600 text-white text-xs font-bold"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CREAR / EDITAR PROFESIONAL ================= */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    {editingMember ? 'Editar Profesional del Equipo' : 'Nuevo Profesional del Equipo'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Completá los datos para que aparezca en el carrusel de la página Nosotros.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              {/* Nombre y Cargo */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    value={tmName}
                    onChange={(e) => setTmName(e.target.value)}
                    placeholder="Ej. Dra. Nathaly Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cargo / Especialidad Principal</label>
                  <input
                    type="text"
                    required
                    value={tmRole}
                    onChange={(e) => setTmRole(e.target.value)}
                    placeholder="Ej. Ortodoncista / Cirujano Maxilofacial"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Biografía / Trayectoria y Formación
                </label>
                <textarea
                  rows={4}
                  required
                  value={tmBio}
                  onChange={(e) => setTmBio(e.target.value)}
                  placeholder="Odontóloga especialista en... con más de 10 años de experiencia, egresada de..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Foto del Profesional */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700">Foto del Profesional</label>
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white border border-slate-300 shrink-0 shadow-xs">
                    <img
                      src={tmPhoto || '/images/dentisalud/37_nathaly.png'}
                      alt="Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <label className="px-3 py-1.5 bg-[#0A2540] hover:bg-[#051E34] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploadingTeamPhoto ? 'Subiendo...' : 'Subir archivo de mi PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'team');
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Presets dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 whitespace-nowrap">O elegir preset:</span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) setTmPhoto(e.target.value);
                        }}
                        className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none w-full"
                        defaultValue=""
                      >
                        <option value="" disabled>Seleccionar foto de la clínica...</option>
                        {CLINIC_PRESET_PHOTOS.map((p) => (
                          <option key={p.url} value={p.url}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      value={tmPhoto}
                      onChange={(e) => setTmPhoto(e.target.value)}
                      placeholder="O pegar URL de imagen: /images/... o https://..."
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Tags / Especialidades */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Especialidades / Palabras Clave (separadas por coma)
                </label>
                <input
                  type="text"
                  value={tmTags}
                  onChange={(e) => setTmTags(e.target.value)}
                  placeholder="Ej. Implantología, Estética Dental, Rehabilitación Oral"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Instagram URL y Handle */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Link de Instagram (opcional)
                  </label>
                  <input
                    type="url"
                    value={tmInstagram}
                    onChange={(e) => setTmInstagram(e.target.value)}
                    placeholder="https://www.instagram.com/usuario/"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Usuario de Instagram (Handle)
                  </label>
                  <input
                    type="text"
                    value={tmInstagramHandle}
                    onChange={(e) => setTmInstagramHandle(e.target.value)}
                    placeholder="Ej. @od.nathalymartinez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Visibilidad Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="tmActiveCheck"
                  checked={tmActive}
                  onChange={(e) => setTmActive(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <label htmlFor="tmActiveCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Mostrar este profesional en el carrusel de la página web
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingMember}
                  className="px-5 py-2 rounded-xl bg-[#0A2540] hover:bg-[#051E34] text-white font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {isSavingMember ? 'Guardando...' : editingMember ? 'Guardar Cambios' : 'Agregar al Equipo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CONFIRM DELETE PROFESIONAL ================= */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              ¿Eliminar a {memberToDelete.name}?
            </h3>
            <p className="text-xs text-slate-500">
              Esta acción quitará al profesional del equipo y del carrusel de la página Nosotros.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteMember}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CONFIRM DELETE TESTIMONIO ================= */}
      {reviewToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              ¿Eliminar testimonio de {reviewToDelete.name}?
            </h3>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteReview}
                className="px-5 py-2 rounded-full bg-red-600 text-white text-xs font-bold"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
