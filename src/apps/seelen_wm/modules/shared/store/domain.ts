import { SoftOpaque } from 'readable-types';
import { WindowManagerSettings } from 'seelen-core';

import { Reservation } from '../../layout/domain';
import { HWND } from '../utils/domain';

import { IRootState } from '../../../../../shared.interfaces';
import { Layout } from '../../../../shared/schemas/Layout';

interface Workspace {
  name: string;
  layout: Layout;
}

export type DesktopId = SoftOpaque<string, 'DesktopId'>;

export enum FocusAction {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
  Latest = 'Latest',
}

export interface RootState extends IRootState<WindowManagerSettings> {
  availableLayouts: Layout[];
  workspaces: Record<DesktopId, Workspace>;
  activeWorkspace: DesktopId;
  /** current focused window handle */
  activeWindow: HWND;
  /** last managed window activated */
  lastManagedActivated: HWND | null;
  reservation: Reservation | null;
  handlesByDesktop: Record<DesktopId, HWND[]>;
  desktopByHandle: Record<HWND, DesktopId>;
  /** Prop to listen for app forced updates */
  version: number;
}

export interface AddWindowPayload {
  hwnd: HWND;
  desktop_id: DesktopId;
  as_floating: boolean;
}
