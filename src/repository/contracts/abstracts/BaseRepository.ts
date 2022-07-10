export default abstract class BaseRepository<T> {
	public abstract findById(id: string): Promise<T>
} 