import React from 'react';
import { Plane, FileCheck, ShieldCheck, CloudSun, Backpack, BusFront, Layers, Shirt, CloudRain, Flame, Footprints, Snowflake, Hand, Wind, Glasses, Waves, Users, Heart, Baby, Camera, Award, Compass, Download, Phone, MessageCircle, Mail, Clock, Hotel, Mountain, MapPin } from 'lucide-react';

/** Icon registry (lucide) so data files can reference icons by name. */
export const ICONS = { Plane, FileCheck, ShieldCheck, CloudSun, Backpack, BusFront, Layers, Shirt, CloudRain, Flame, Footprints, Snowflake, Hand, Wind, Glasses, Waves, Users, Heart, Baby, Camera, Award, Compass, Download, Phone, MessageCircle, Mail, Clock, Hotel, Mountain, MapPin };

export default function Icon({ name, size = 22, strokeWidth = 1.6, ...rest }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
