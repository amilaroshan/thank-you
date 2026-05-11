declare module "react-simple-maps" {
  import type { SVGProps, MouseEvent, FocusEvent, ReactElement } from "react";

  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => React.ReactNode;
  }

  export interface Geography {
    rsmKey: string;
    id: string | number;
    properties: Record<string, unknown>;
    geometry: object;
    type: string;
  }

  export interface GeographyStyle {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
    filter?: string;
  }

  export interface GeographyProps extends Omit<SVGProps<SVGPathElement>, "style"> {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: GeographyStyle;
      hover?: GeographyStyle;
      pressed?: GeographyStyle;
    };
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
    onFocus?: (event: FocusEvent<SVGPathElement>) => void;
    onBlur?: (event: FocusEvent<SVGPathElement>) => void;
    tabIndex?: number;
  }

  export function ComposableMap(props: ComposableMapProps): ReactElement;
  export function Geographies(props: GeographiesProps): ReactElement;
  export function Geography(props: GeographyProps): ReactElement;
}
