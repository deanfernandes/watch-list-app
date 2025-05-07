namespace DeanFernandes.WatchListApp.API.Models
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int GenreId { get; set; }
    }

    public class CreateUpdateMovieDto
    {
        public string Title { get; set; }
        public int GenreId { get; set; }
    }
}
