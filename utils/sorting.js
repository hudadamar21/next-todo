function sorting(data, value) {
  switch (value) {
    case 'Terbaru' :
      return data.sort((a, b) => b.id - a.id);
    case 'Terlama' :
      return data.sort((a, b) => a.id - b.id);
    case 'A-Z' :
      return data.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
    case 'Z-A' :
      return data.sort((a, b) => a.title < b.title ? 1 : a.title > b.title ? -1 : 0)
    case 'Belum Selesai' :
      return data.sort((a, b) => a.is_active < b.is_active ? 1 : a.is_active > b.is_active ? -1 : 0)
  }
}

export default sorting