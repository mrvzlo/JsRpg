import Point from '@/components/shared/map/point';

export default interface Character extends Point {
   name: string;
   position: Point;
}
