export const gmapsKey = process.env.NEXT_PUBLIC_GMAPS_KEY || '';

export const styles = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#96d4c8',
      },
      {
        visibility: 'on',
      },
    ],
  },
];

export const clusterStyles = [
  {
    textColor: 'white',
    url: '/assets/img/cluster_small.svg',
    height: 40,
    width: 40,
    textSize: 15,
  },
  {
    textColor: 'white',
    url: '/assets/img/cluster_medium.svg',
    height: 50,
    width: 50,
    textSize: 15,
  },
  {
    textColor: 'white',
    url: '/assets/img/cluster_big.svg',
    height: 80,
    width: 80,
    textSize: 15,
  },
];

export const marker =
  'data:image/Svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIyOCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDgwIDExNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7Ij48cGF0aCBkPSJNNzYuMzI0LDQwLjEwNmMwLDIwLjIzNyAtMzYuNjM4LDczLjI4IC0zNi42MzgsNzMuMjhjMCwwIC0zNi42NCwtNTMuMDQzIC0zNi42NCwtNzMuMjhjMCwtMjAuMjM2IDE2LjQwNSwtMzYuNjM4IDM2LjY0LC0zNi42MzhjMjAuMjM1LDAgMzYuNjM4LDE2LjQwMiAzNi42MzgsMzYuNjM4IiBzdHlsZT0iZmlsbDojZmY1NzIyO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0yOS45MDIsNTYuODI4bC05Ljc4MiwtMTYuOTQ0bDkuNzgyLC0xNi45NDNsMTkuNTY2LDBsOS43ODIsMTYuOTQzbC05Ljc4MiwxNi45NDRsLTE5LjU2NiwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48L3N2Zz4=';

export const markerUser =
  'data:image/Svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjIgMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMS40MTQiPgogIDx1c2UgeGxpbms6aHJlZj0iI19JbWFnZTEiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIvPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjkuMzA1IiBmaWxsPSIjMDA4YWZmIi8+Cjwvc3ZnPg==';
