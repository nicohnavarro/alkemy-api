import ContentTypeRepository from "../repositories/contentTypeRepository.js";
import GenderTypeRepository from "../repositories/genderTypeRepository.js";
import MovieRepository from "../repositories/movieRepository.js";
const repository = new MovieRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();
import ImageRepository from "../repositories/imageRepository.js";
const imageRepository = new ImageRepository();


const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const findById = async (id) => {
  return await repository.findByIdWithCharacter(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const save = async (movie) => {
  const genderType = await genderTypeRepository.findByDescription(
    movie.genderType
  );
  const contentType = await contentTypeRepository.findByDescription(
    movie.contentType
  );
  movie.genderTypeId = genderType.id;
  movie.contentTypeId = contentType.id;
  return await repository.save(movie);
};

const update = async (id, movie) => {
  if (movie.genderType) {
    const genderType = await genderTypeRepository.findByDescription(
      movie.genderType
    );
    movie.genderTypeId = genderType.id;
  }
  if (movie.contentType) {
    const contentType = await contentTypeRepository.findByDescription(
      movie.contentType
    );
    movie.contentTypeId = contentType.id;
  }
  return await repository.update(id, movie);
};

const remove = async (id) => {
  const movie = await repository.findById(id);
  imageRepository.deleteImage(movie.image);
  return await repository.remove(id);
};

const associate = async (movie, character) => {
  return await movie.addCharacter(character);
};

export { findAll, findById, findByTitle, save, update, remove, associate };
