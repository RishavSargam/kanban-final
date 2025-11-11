export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export const isOverdue = (due?: Date | string) => { if (!due) return false; return new Date() > new Date(due); };

export const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : '';

export const formatDate = (d?: Date | string) => d ? new Date(d).toLocaleDateString() : '';

export const priorityColor = (p?: Priority) => {
  switch(p){
    case 'low': return 'border-l-4 border-blue-400';
    case 'medium': return 'border-l-4 border-yellow-400';
    case 'high': return 'border-l-4 border-orange-400';
    case 'urgent': return 'border-l-4 border-red-500';
    default: return '';
  }
};
