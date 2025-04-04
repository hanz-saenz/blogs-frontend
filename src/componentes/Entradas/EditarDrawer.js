import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, Select, Upload, message, Spin, Popconfirm } from "antd";
import { UploadOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import apiURL from "../../UrlBackend";
import { editarEntrada, getEntradaId, eliminarEntradaId } from "../../servicios/blogServicios";

const { TextArea } = Input;
const { Option } = Select;

const EditarDrawer = ({ 
  entradaId, 
  open, 
  onClose, 
  listaEntradas,
  listaCategorias,
  listaAutores
}) => {
  const [formulario] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [entradaData, setEntradaData] = useState(null);

  

  // Obtener datos de la entrada
  useEffect(() => {

    const datosEntrada = async () => {
      setLoading(true);
      try {
        const entradaRes = await getEntradaId(entradaId.id);
        setEntradaData(entradaRes);
        
        formulario.setFieldsValue({
          titulo: entradaRes.titulo,
          contenido: entradaRes.contenido,
          categorias: entradaRes.categoria.map(c => c.id),
          autor: entradaRes.autor.id
        });
  
        if (entradaRes.imagen) {
          setImagen({
            uid: '-1',
            name: 'imagen_actual',
            status: 'done',
            url: entradaRes.imagen
          });
        }
      } catch (error) {
        message.error('Error al cargar los datos de la entrada');
        // onClose();
      } finally {
        setLoading(false);
      }
    };

    datosEntrada();
  }, [entradaId, formulario,]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Solo puedes subir archivos de imagen!');
    }
    return isImage;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const guardarEntrada = async (e) => {
    e.preventDefault();
    try {
      const values = await formulario.validateFields();
      setLoading(true);

      const formData = new FormData();
      if (imagen?.originFileObj) {
        formData.append('imagen', imagen.originFileObj);
      } 

    console.log('imagen', imagen.originFileObj);
      formData.append('imagen', imagen.originFileObj);
      formData.append('titulo', values.titulo);
      formData.append('contenido', values.contenido);
      values.categorias.forEach(cat => formData.append('categorias', cat));
      formData.append('autor', values.autor);

      await editarEntrada(entradaId.id, formData);

      message.success('Entrada actualizada correctamente');
      formulario.resetFields();
      onClose();
      listaEntradas();
    } catch (error) {
      if (error.response?.status === 400) {
        message.error('Error en los datos: ' + JSON.stringify(error.response.data));
      } else {
        message.error('Error al actualizar la entrada');
      }
    } finally {
      setLoading(false);
    }
  };


  const eliminarEntrada = async () => {

    try {
        await eliminarEntradaId(entradaId.id);
        message.success('Entrada eliminada correctamente');
        onClose();
        await listaEntradas();
    } catch (error) {
      console.log(error);
    }

  }

  

  return (
    <Drawer
      title="Editar Entrada"
      width={530}
      onClose={onClose}
      open={open}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Popconfirm
            title="¿Estás seguro de eliminar esta entrada?"
            onConfirm={eliminarEntrada}
            okText="Sí"
            cancelText="No"
            okButtonProps={{ loading: deleting }}
          >
            <Button danger icon={<DeleteOutlined />} loading={deleting}>
              Eliminar
            </Button>
          </Popconfirm>
          
          <div>
            <Button onClick={onClose} icon={<CloseOutlined />} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button 
              type="primary" 
              onClick={guardarEntrada}
              icon={<SaveOutlined />}
              loading={loading}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      }
    >
      <Spin spinning={loading && !entradaData}>
        <Form form={formulario} layout="vertical">
          <Form.Item 
            label="Título"  
            name="titulo"
            rules={[{ required: true, message: 'Por favor ingrese el título' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item 
            label="Contenido" 
            name="contenido"
            rules={[{ required: true, message: 'Por favor ingrese el contenido' }]}
          >
            <TextArea rows={8} />
          </Form.Item>
          
          <Form.Item
            label="Categorías" 
            name="categorias"
            rules={[{ required: true, message: 'Seleccione al menos una categoría' }]}
          >
            <Select
              mode="multiple"
              placeholder="Seleccione las categorías"
              optionFilterProp="children"
            >
              {listaCategorias.map((categoria) => (
                <Option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Autor"
            name="autor"
            rules={[{ required: true, message: 'Seleccione un autor' }]}
          >
            <Select
              placeholder="Seleccione el autor"
              optionFilterProp="children"
            >
              {listaAutores.map((autor) => (
                <Option key={autor.id} value={autor.id}>
                  {autor.usuario.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Imagen"
            name="imagen"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Suba una nueva imagen para reemplazar la actual"
            >
                <img src={`${apiURL}/${entradaData?.imagen}`} alt="Imagen actual" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            <Upload
                name="imagen"
                listType="picture"
                beforeUpload={beforeUpload}
                onChange={({ file }) => setImagen(file)}
                fileList={[
                imagen && imagen instanceof File
                    ? { uid: "-1", name: imagen.name, status: "done", url: URL.createObjectURL(imagen) }
                    : entradaData?.imagen
                    ? { uid: "-1", name: "Imagen actual", status: "done", url: entradaData.imagen }
                    : null
                ].filter(Boolean)} // Filtra valores nulos
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
            </Form.Item>


        </Form>
      </Spin>
    </Drawer>
  );
};

export default EditarDrawer;