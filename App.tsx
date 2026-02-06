import React, { useState } from 'react';
import { Section, ViewMode } from './types';
import { INITIAL_SECTIONS } from './constants';
import RenderSection from './components/RenderSection';
import EditorPanel from './components/EditorPanel';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Smartphone, Tablet, Monitor, Download, GripVertical, Plus } from 'lucide-react';

// --- Sortable Item Wrapper ---
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {/* Drag Handle - Only visible on hover in desktop mode usually, but we'll make it always accessible for this app context */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
        title="Drag to reorder"
      >
        <div className="bg-white p-2 rounded shadow text-gray-500">
           <GripVertical size={20} />
        </div>
      </div>
      
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedSection = sections.find(s => s.id === selectedSectionId) || null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateSection = (updatedSection: Section) => {
    setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
  };

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleExport = () => {
    // Generate HTML string
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Academy ENGLISH Quick</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: {
                blue: '#0B3FA7',
                blueLight: '#124FC4',
                red: '#D60000',
                dark: '#1F1F1F',
              }
            }
          }
        }
      }
    </script>
    <!-- Lucide Icons Script -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-gray-50 text-gray-900">
    ${document.getElementById('preview-container')?.innerHTML || ''}
    <script>
      lucide.createIcons();
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page-english-quick.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Dynamic width for responsive preview
  const getContainerWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': return 'max-w-full';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden">
      
      {/* --- Main Workspace (Preview) --- */}
      <div className="flex-1 flex flex-col h-full bg-gray-100 relative transition-all duration-300">
        
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-3 flex justify-between items-center shadow-sm z-20">
          <div className="flex items-center gap-4">
             <h1 className="font-bold text-brand-blue hidden md:block">English Quick Builder</h1>
             <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
                <button 
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white shadow text-brand-blue' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <Monitor size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-white shadow text-brand-blue' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <Tablet size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white shadow text-brand-blue' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <Smartphone size={20} />
                </button>
             </div>
          </div>
          
          <button 
            onClick={handleExport}
            className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition shadow-lg font-medium text-sm"
          >
            <Download size={18} /> Exportar Web
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-200/50">
          <div 
             className={`${getContainerWidth()} w-full bg-white shadow-2xl transition-all duration-300 min-h-screen ease-in-out border border-gray-300`}
             style={{ transformOrigin: 'top center' }}
          >
             <div id="preview-container">
               <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {sections.map((section) => (
                      <SortableItem key={section.id} id={section.id} onClick={() => setSelectedSectionId(section.id)}>
                        <RenderSection 
                          section={section} 
                          onClick={() => setSelectedSectionId(section.id)}
                          isSelected={selectedSectionId === section.id}
                        />
                      </SortableItem>
                    ))}
                  </SortableContext>
               </DndContext>
             </div>
          </div>
        </div>
      </div>

      {/* --- Right Sidebar (Editor) --- */}
      <div className={`
        fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-30 transform transition-transform duration-300 
        ${selectedSectionId ? 'translate-x-0' : 'translate-x-full'} 
        md:relative md:translate-x-0 md:w-96 border-l
      `}>
         <EditorPanel 
            section={selectedSection}
            onUpdate={handleUpdateSection}
            onClose={() => setSelectedSectionId(null)}
            onImageUpload={handleImageUpload}
         />
      </div>

    </div>
  );
};

export default App;