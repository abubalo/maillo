

type AvatarProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', status }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500'
  }

  return (
    <div className="relative inline-block cursor-pointer">
      <img 
        src={src} 
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 bg-green-500 border-white shadow-sm`}
      />
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ${sizeClasses[size] === 'w-8 h-8' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} ${statusColors[status]} ring-2 ring-white`}
        />
      )}
    </div>
  )
}

export default Avatar