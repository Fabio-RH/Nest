-- CreateTable
CREATE TABLE `usuario` (
    `idusuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeusuario` VARCHAR(150) NOT NULL,
    `emailusuario` VARCHAR(150) NOT NULL,
    `usuariosenha` VARCHAR(255) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_emailusuario_key`(`emailusuario`),
    PRIMARY KEY (`idusuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contato` (
    `idcontato` INTEGER NOT NULL AUTO_INCREMENT,
    `nomecontato` VARCHAR(150) NOT NULL,
    `telefonecontato` VARCHAR(20) NOT NULL,
    `emailcontato` VARCHAR(150) NOT NULL,
    `enderecocontato` VARCHAR(255) NOT NULL,
    `usuario_idusuario` INTEGER NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idcontato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contato` ADD CONSTRAINT `contato_usuario_idusuario_fkey` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
