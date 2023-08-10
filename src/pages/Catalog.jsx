// @ts-nocheck
import React, { useCallback, useState, useEffect, useRef } from "react";
import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listProduct } from "redux/actions/product.actions";
import { listCategory } from "redux/actions/category.action";
import { listColor } from "redux/actions/color.actions";
import { listSize } from "redux/actions/size.actions";
import SearchBar from "components/SearchBar";
import EmptyView from "components/EmptyView";
import ProductSort from "components/Product-sort";
import { isEmpty } from "lodash";
import { Collapse } from "antd";
import { FILTER_PRICE } from "common/common";
const { Panel } = Collapse;
const Catalog = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.items);
  const categoryList = useSelector((state) => state.category);
  const colorList = useSelector((state) => state.color);
  const sizeList = useSelector((state) => state.size);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [conditionSort, setSort] = useState({ limit: 8 });
  const [filterPrice, setFilterPrice] = useState({ limit: 8 });
  const [products, setProducts] = useState([]);
  const initFilter = {
    categories: [],
    colors: [],
    sizes: [],
  };
  useEffect(() => {
    if (!isEmpty(productList)) {
      setProducts(productList);
    }
  }, [products, productList]);
  const [filter, setFilter] = useState(initFilter);
  useEffect(() => {
    if (filterPrice || conditionSort) {
      const params = {
        orderPrice: conditionSort.orderPrice,
        minPrice: filterPrice.minPrice,
        maxPrice: filterPrice.maxPrice,
        limit: 8,
      };
      dispatch(listProduct(params));
    }
    dispatch(listProduct());
    dispatch(listCategory());
    dispatch(listColor());
    dispatch(listSize());
  }, [conditionSort, filterPrice, dispatch]);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            categories: [...filter.categories, item.id],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, colors: [...filter.colors, item.code] });
          break;
        case "SIZE":
          setFilter({ ...filter, sizes: [...filter.sizes, item.name] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.categories.filter((e) => e !== item.id);
          setFilter({ ...filter, categories: newCategory });
          break;
        case "COLOR":
          const newColor = filter.colors.filter((e) => e !== item.code);
          setFilter({ ...filter, colors: newColor });
          break;
        case "SIZE":
          const newSize = filter.sizes.filter((e) => e !== item.name);
          setFilter({ ...filter, sizes: newSize });
          break;
        default:
      }
    }
  };
  const clearFilter = () => setFilter(initFilter);

  const handleSortChange = (newSortValue) => {
    setSort({
      ...conditionSort,
      orderPrice: newSortValue,
    });
  };
  const handleFilterPrice = (minPrice, maxPrice) => {
    setFilterPrice({
      ...filterPrice,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };
  const updateProducts = useCallback(() => {
    let temp = productList;
    if (filter.categories.length > 0) {
      temp = temp.filter((e) => filter.categories.includes(e.subCategory?.id));
    }

    if (filter.colors.length > 0) {
      temp = temp.filter((e) => {
        const check = e?.productVersions?.find((item) => {
          return filter?.colors?.includes(item?.color?.code);
        });
        return check !== undefined;
      });
    }
    if (filter.sizes.length > 0) {
      temp = temp.filter((e) => {
        const check = e?.productVersions?.find((item) =>
          filter?.sizes?.includes(item?.size?.name)
        );
        return check !== undefined;
      });
    }

    if (searchInput) {
      temp = temp.filter(
        (item) =>
          item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    setProducts(temp);
    !isEmpty(temp) ? setResultsFound(true) : setResultsFound(false);
  }, [filter, productList, searchInput]);
  useEffect(() => {
    updateProducts();
  }, [updateProducts, productList, searchInput, resultsFound]);
  const filterRef = useRef(null);
  const showHideFilter = () => filterRef.current?.classList.toggle("active");
  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__search">
            <SearchBar
              value={searchInput}
              changeInput={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {categoryList?.items.map((item) => {
                return (
                  <Collapse
                    bordered={false}
                    defaultActiveKey={[item.id.toString()]} // Use the categoryId as the defaultActiveKey
                    onChange={() => {
                      dispatch(listProduct({ categoryId: item.id }));
                    }}
                  >
                    <Panel
                      header={<span>{item.name}</span>}
                      key={item.id.toString()} // Use the categoryId as the key
                      style={{
                        paddingLeft: 24,
                        paddingTop: 10,
                        cursor: "pointer",
                      }}
                    >
                      {item.subCategories?.map((itemChild) => (
                        <div className="catalog__filter__widget__content__item">
                          <CheckBox
                            label={itemChild.name}
                            onChange={(input) =>
                              filterSelect("CATEGORY", input.checked, itemChild)
                            }
                            checked={filter.categories.includes(itemChild?.id)}
                          />
                        </div>
                      ))}
                    </Panel>
                  </Collapse>
                );
              })}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colorList?.items?.length
                ? colorList?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                      style={{ marginBottom: "13px" }}
                    >
                      <CheckBox
                        label={item.name}
                        onChange={(input) =>
                          filterSelect("COLOR", input.checked, item)
                        }
                        checked={filter.colors.includes(item.code)}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {sizeList?.items?.length
                ? sizeList?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                    >
                      <CheckBox
                        label={item.name}
                        onChange={(input) =>
                          filterSelect("SIZE", input.checked, item)
                        }
                        checked={filter.sizes.includes(item.name)}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Khoảng giá:</div>
            <div className="catalog__filter__widget__content">
              {FILTER_PRICE.map((itemPrice) => (
                <>
                  <div className="catalog__filter__widget__content__item">
                    <CheckBox
                      label={itemPrice.label}
                      onChange={() =>
                        handleFilterPrice(
                          itemPrice.minPrice,
                          itemPrice.maxPrice
                        )
                      }
                    />
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          <div className="catalog__content__sort">
            <div className="row">
              <h4>Sắp xếp theo</h4>
              <ProductSort
                current={conditionSort?.orderPrice}
                onchange={handleSortChange}
              />
            </div>
          </div>
          {resultsFound ? (
            <>
              <InfinityList data={products} />
            </>
          ) : (
            <EmptyView />
          )}
          {/* <Pagination
						style={{
							float: 'right',
							marginBottom: '40px',
							marginTop: '-40px',
						}}
						count={Math.ceil(productList.meta.total / 8)}
						page={page}
						// onChange={handleChange}
					/> */}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
