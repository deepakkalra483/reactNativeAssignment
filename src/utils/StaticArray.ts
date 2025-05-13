export const filterData = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Complete',
  },
  {
    id: 3,
    name: 'Pending',
  },
];

export interface taskModal {
  userId?: number;
  id: number;
  title?: string | null;
  description?: string | null;
  dueDate?: string | null
  completed?: boolean | null;
  priority?:string | null
}

export interface loadingProps {
  refreshing: boolean;
  fetching: boolean;
  more: boolean;
}

export interface BasciRequestProps {
  baseUrl?: string;
  params: any;
  onLoading: (isLoading: boolean) => void;
  onSuccess: (response?: any | undefined) => void;
  onError: (error: any) => void;
}

export interface ToastProps {
  message: string;
  type?: `none` | `success` | `danger` | `info` | `warning`;
}

export interface CreateErrorProps {
  title_error?: string | null;
  description_error?: string | null;
}
