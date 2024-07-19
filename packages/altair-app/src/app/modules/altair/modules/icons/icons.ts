import {
  // icons
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowLeft,
  Book,
  Box,
  Braces,
  Briefcase,
  Camera,
  Check,
  CheckCheck,
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Cloud,
  Code,
  Coins,
  Copy,
  Cpu,
  Disc,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileDown,
  FilePlus,
  FlaskConical,
  Folder,
  FolderDot,
  FolderMinus,
  FolderPlus,
  Github,
  Grid,
  HardDrive,
  Heart,
  History,
  Home,
  Info,
  Lock,
  List,
  Loader,
  LogIn,
  LogOut,
  Minimize2,
  MoreHorizontal,
  MoreVertical,
  Paintbrush,
  Paperclip,
  PlusCircle,
  PlusSquare,
  RefreshCcw,
  Repeat,
  Save,
  Settings,
  Sidebar,
  Sparkles,
  Sun,
  Tag,
  Terminal,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Watch,
  X,
  XCircle,
  XSquare,
  Zap,
} from 'lucide-angular';

// https://lucide.dev/
export const icons = {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowLeft,
  Book,
  Box,
  Braces,
  Briefcase,
  Camera,
  Check,
  CheckCheck,
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Cloud,
  Code,
  Coins,
  Copy,
  Cpu,
  Disc,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileDown,
  FilePlus,
  FlaskConical,
  Folder,
  FolderDot,
  FolderMinus,
  FolderPlus,
  Github,
  Grid,
  HardDrive,
  Heart,
  History,
  Home,
  Info,
  Lock,
  List,
  Loader,
  LogIn,
  LogOut,
  Minimize2,
  MoreHorizontal,
  MoreVertical,
  Paintbrush,
  Paperclip,
  PlusCircle,
  PlusSquare,
  RefreshCcw,
  Repeat,
  Save,
  Settings,
  Sidebar,
  Sparkles,
  Sun,
  Tag,
  Terminal,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Watch,
  X,
  XCircle,
  XSquare,
  Zap,
};

type KebabCaseHelper<S, Acc extends string = ''> = S extends `${infer C}${infer T}`
  ? KebabCaseHelper<
      T extends Uncapitalize<T> ? T : Uncapitalize<T>,
      `${Acc}${Lowercase<C>}${T extends Uncapitalize<T>
        ? T extends `${number}${string}`
          ? '-'
          : ''
        : '-'}`
    >
  : Acc;
type KebabCase<S extends string> = KebabCaseHelper<S>;

export type IconName = KebabCase<keyof typeof icons>;
