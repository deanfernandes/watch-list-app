namespace DeanFernandes.WatchListApp.API.Models
{
    public class GenreDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class CreateUpdateGenreDto
    {
        public string Name { get; set; }
    }
}
