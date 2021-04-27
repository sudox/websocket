export interface Link {
  rel: string;
  href: string;
}


export interface HypermediaEntity {
  links: Link[]
}

export interface StoreDataResponse<T extends HypermediaEntity> extends HypermediaEntity {
  data: T[]
}
