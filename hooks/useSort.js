function useSort(data, value) {
  switch (value) {
    case 'Terbaru' :
      console.log('terbaru');
      return data.sort((a, b) => a.id - b.id);
    case 'Terlama' :
      console.log('terlama');
      return data.sort((a, b) => b.id - a.id);
    case 'A-Z' :
      console.log('a-z');
      return data.sort((a, b) => a.title < b.title ? 1 : a.title > b.title ? -1 : 0)
    case 'Z-A' :
      console.log('z-a');
      return data.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
    case 'Belum Selesai' :
      console.log('belum selesai');
      return data.sort((a, b) => a.is_active < b.is_active ? -1 : a.is_active > b.is_active ? 1 : 0)
  }
}

export default useSort