import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  onClick?: () => void;
}

export function FeatureCard({ icon: Icon, title, description, gradient, onClick }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-8 rounded-3xl bg-white cursor-pointer
        transition-all duration-300 hover:scale-105 hover:shadow-lg
        border-4 border-transparent hover:border-opacity-50
        ${onClick ? 'hover:shadow-colored-blue' : ''}
      `}
    >
      {/* Icon background */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
