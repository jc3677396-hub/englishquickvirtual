import React from 'react';
import { Section } from '../types';
import { Palette, Type, Image as ImageIcon, Layout, ArrowLeft, Plus, X, User, Sun } from 'lucide-react';

interface EditorPanelProps {
  section: Section | null;
  onUpdate: (updatedSection: Section) => void;
  onClose: () => void;
  onImageUpload: (file: File) => Promise<string>;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ section, onUpdate, onClose, onImageUpload }) => {
  if (!section) {
    return (
      <div className="p-6 text-center text-gray-500 mt-20">
        <Layout className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <p>Selecciona una sección de la vista previa para editarla.</p>
      </div>
    );
  }

  const handleTextChange = (field: string, value: string) => {
    onUpdate({
      ...section,
      content: { ...section.content, [field]: value },
    });
  };

  const handleStyleChange = (field: string, value: string) => {
    onUpdate({
      ...section,
      styles: { ...section.styles, [field]: value },
    });
  };

  const handleContentChange = (field: string, value: any) => {
    onUpdate({
      ...section,
      content: { ...section.content, [field]: value },
    });
  };

  const handleFeatureChange = (index: number, field: 'title' | 'desc', value: string) => {
    const newFeatures = [...(section.content.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onUpdate({
        ...section,
        content: { ...section.content, features: newFeatures }
    });
  };

  const handleListItemChange = (index: number, field: 'text' | 'imageUrl', value: string) => {
    const newItems = [...(section.content.items || [])];
    if (newItems[index]) {
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({
            ...section,
            content: { ...section.content, items: newItems }
        });
    }
  };

  const handleListItemImageUpload = async (index: number, file: File) => {
    const url = await onImageUpload(file);
    handleListItemChange(index, 'imageUrl', url);
  }

  const handleAddItem = () => {
    const newItems = [...(section.content.items || []), { text: 'Nuevo Elemento' }];
    onUpdate({
        ...section,
        content: { ...section.content, items: newItems }
    });
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...(section.content.items || [])];
    newItems.splice(index, 1);
    onUpdate({
        ...section,
        content: { ...section.content, items: newItems }
    });
  };

  const handleSocialLinkChange = (key: string, value: string) => {
    if (section.content.socialLinks) {
        onUpdate({
            ...section,
            content: {
                ...section.content,
                socialLinks: {
                    ...section.content.socialLinks,
                    [key]: value
                }
            }
        });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await onImageUpload(e.target.files[0]);
      onUpdate({
        ...section,
        content: { ...section.content, imageUrl: url },
      });
    }
  };

  const handleCeoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await onImageUpload(e.target.files[0]);
      onUpdate({
        ...section,
        content: { ...section.content, ceoImageUrl: url },
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-xl">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h3 className="font-bold text-lg text-brand-blue">{section.name}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Content Editing */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
            <Type className="w-4 h-4" /> Contenido
          </h4>
          
          {section.content.logoText !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Logo</label>
              <input 
                type="text" 
                value={section.content.logoText} 
                onChange={(e) => handleTextChange('logoText', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
          )}

          {section.content.title !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
              <input 
                type="text" 
                value={section.content.title} 
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
          )}

          {section.content.subtitle !== undefined && (
             <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
             <textarea 
               value={section.content.subtitle} 
               onChange={(e) => handleTextChange('subtitle', e.target.value)}
               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue outline-none h-20"
             />
           </div>
          )}

          {section.content.description !== undefined && (
             <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
             <textarea 
               value={section.content.description} 
               onChange={(e) => handleTextChange('description', e.target.value)}
               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue outline-none h-32"
             />
           </div>
          )}

          {/* Social Links Editing */}
          {section.content.socialLinks && (
             <div className="space-y-3">
                 <label className="block text-sm font-medium text-gray-700">Redes Sociales</label>
                 {Object.entries(section.content.socialLinks).map(([key, value]) => (
                     <div key={key}>
                         <label className="text-xs text-gray-500 capitalize">{key}</label>
                         <input 
                            className="w-full p-2 border rounded text-sm"
                            value={value}
                            onChange={(e) => handleSocialLinkChange(key, e.target.value)}
                         />
                     </div>
                 ))}
             </div>
          )}

          {/* Features Editing (Why Us) */}
          {section.content.features && (
              <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Características</label>
                  {section.content.features.map((feat, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded border">
                          <input 
                            className="w-full mb-2 p-1 border rounded text-sm font-bold"
                            value={feat.title}
                            onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          />
                          <input 
                            className="w-full p-1 border rounded text-sm"
                            value={feat.desc}
                            onChange={(e) => handleFeatureChange(idx, 'desc', e.target.value)}
                          />
                      </div>
                  ))}
              </div>
          )}

           {/* List Editing (Jobs) */}
           {section.content.items && (
              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Lista de Elementos</label>
                    <button onClick={handleAddItem} className="text-brand-blue hover:bg-blue-50 p-1 rounded">
                        <Plus size={16} />
                    </button>
                  </div>
                  {section.content.items.map((item, idx) => (
                      <div key={idx} className="p-3 border rounded bg-gray-50 relative group">
                          <button 
                            onClick={() => handleDeleteItem(idx)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                             <X size={16} />
                          </button>
                          
                          <input 
                            className="w-full p-2 border rounded text-sm mb-2"
                            value={item.text}
                            onChange={(e) => handleListItemChange(idx, 'text', e.target.value)}
                            placeholder="Texto del elemento"
                          />
                          
                          <div className="flex items-center gap-2">
                              {item.imageUrl && (
                                  <img src={item.imageUrl} alt="preview" className="w-8 h-8 rounded object-cover" />
                              )}
                              <label className="cursor-pointer bg-white border border-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
                                <ImageIcon size={12} /> {item.imageUrl ? 'Cambiar Imagen' : 'Agregar Imagen'}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                    if(e.target.files?.[0]) handleListItemImageUpload(idx, e.target.files[0])
                                }} />
                              </label>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>

        {/* CEO Image Upload (for Institutional and Footer) */}
        {(section.type === 'footer' || section.type === 'institutional') && (
           <div className="space-y-4">
            <h4 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
              <User className="w-4 h-4" /> Foto del CEO
            </h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                {section.content.ceoImageUrl ? (
                    <img src={section.content.ceoImageUrl} alt="CEO" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-gray-400">
                        <User size={24} />
                    </div>
                )}
                <label className="cursor-pointer bg-brand-blue text-white px-4 py-2 rounded text-sm hover:bg-brand-blueLight block mx-auto w-fit">
                    {section.content.ceoImageUrl ? 'Cambiar Foto' : 'Subir Foto'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleCeoFileUpload} />
                </label>
            </div>
          </div>
        )}

        {/* Image Uploading & Brightness (Main Section Image) */}
        {section.content.imageUrl && (
           <div className="space-y-4">
            <h4 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
              <ImageIcon className="w-4 h-4" /> Imagen Principal
            </h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors mb-4">
                <img 
                    src={section.content.imageUrl} 
                    alt="Current" 
                    className="w-full h-32 object-cover rounded mb-2"
                    style={{ filter: `brightness(${section.content.imageBrightness || 100}%)` }} 
                />
                <label className="cursor-pointer bg-brand-blue text-white px-4 py-2 rounded text-sm hover:bg-brand-blueLight block mx-auto w-fit">
                    Subir Nueva Imagen
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
            </div>

            {/* Brightness Control */}
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Sun size={12} /> Brillo de la imagen
                    </label>
                    <span className="text-xs text-gray-500">{section.content.imageBrightness || 100}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="5"
                    value={section.content.imageBrightness !== undefined ? section.content.imageBrightness : 100}
                    onChange={(e) => handleContentChange('imageBrightness', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
            </div>
          </div>
        )}

        {/* Style Editing */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
            <Palette className="w-4 h-4" /> Estilos
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Fondo</label>
              <div className="flex items-center gap-2">
                <input 
                    type="color" 
                    value={section.styles.backgroundColor}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-xs">{section.styles.backgroundColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Texto</label>
              <div className="flex items-center gap-2">
                 <input 
                    type="color" 
                    value={section.styles.textColor}
                    onChange={(e) => handleStyleChange('textColor', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                />
                 <span className="text-xs">{section.styles.textColor}</span>
              </div>
            </div>
             <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Acentos</label>
              <div className="flex items-center gap-2">
                 <input 
                    type="color" 
                    value={section.styles.accentColor}
                    onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                />
                 <span className="text-xs">{section.styles.accentColor}</span>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Alineación</label>
             <select 
                value={section.styles.textAlign} 
                onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
             >
                 <option value="left">Izquierda</option>
                 <option value="center">Centro</option>
                 <option value="right">Derecha</option>
             </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;