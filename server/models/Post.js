module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    Post.associate = (models) => {
        
        Post.hasMany(models.File, {
            onDelete: 'cascade',
        });
    }
    
    return Post;
  };
  