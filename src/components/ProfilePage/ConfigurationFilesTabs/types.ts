export type TCatygoryTitle = 'Windows' | 'Mac' | 'Android' | 'IOS' | 'SSH';
export type TCatygoryIcon = 'windows' | 'mac' | 'android' | 'ios' | null;

export interface ILink {
  apiLink: string;
  linkName: string;
  fileName: string;
  ext: 'png' | 'txt' | 'conf' | 'pem' | 'p12' | 'ovpn' | 'mobileconfig';
}

export interface ISortedLinks {
  title: TCatygoryTitle;
  icon: TCatygoryIcon;
  links: ILink[];
}
