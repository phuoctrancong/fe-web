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
import {
  FILTER_PRICE,
  SORTS,
  SortKey,
  convertFilterParams,
} from "common/common";
const { Panel } = Collapse;
const CatalogTest = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.items);
  const categoryList = useSelector((state) => state.category);
  const colorList = useSelector((state) => state.color);
  const sizeList = useSelector((state) => state.size);
  const [resultsFound, setResultsFound] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const initFilter = {
    subCategoryIds: [],
    colorIds: [],
    sizeIds: [],
    maxPrice: null,
    minPrice: null,
    orderPrice: [null, null],
  };
  const [filterOps, setFilterOps] = useState(initFilter);
  const handleChangeFilter = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilterOps({
            ...filterOps,
            subCategoryIds: [...filterOps.subCategoryIds, item.id],
          });
          break;
        case "COLOR":
          setFilterOps({
            ...filterOps,
            colorIds: [...filterOps.colorIds, item.id],
          });
          break;
        case "SIZE":
          setFilterOps({
            ...filterOps,
            sizeIds: [...filterOps.sizeIds, item.id],
          });
          break;
        case "PRICE":
          setFilterOps({
            ...filterOps,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
          });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filterOps.subCategoryIds.filter(
            (e) => e !== item.id
          );
          setFilterOps({ ...filterOps, subCategoryIds: newCategory });
          break;
        case "COLOR":
          const newColor = filterOps.colorIds.filter((e) => e !== item.id);
          setFilterOps({ ...filterOps, colorIds: newColor });
          break;
        case "SIZE":
          const newSize = filterOps.sizeIds.filter((e) => e !== item.id);
          setFilterOps({ ...filterOps, sizeIds: newSize });
          break;
        case "PRICE":
          setFilterOps({
            ...filterOps,
            minPrice: null,
            maxPrice: null,
          });
          break;
        default:
          break;
      }
    }
  };
  const [sortOps, setSortOps] = useState([]);
  const handleSort = (type) => {
    if (type?.props?.value === SortKey.CREATED_AT) {
      const newSort = {
        column: type?.props?.value,
        order: "DESC",
      };
      setSortOps([
        {
          ...newSort,
        },
      ]);
    }
    if (type?.props?.value === SortKey.NAME) {
      const newSort = {
        column: type?.props?.value,
        order: "DESC",
      };
      setSortOps([
        {
          ...newSort,
        },
      ]);
    }
    if (type?.props?.value === SortKey.PRICE_MAX) {
      const newSort = {
        column: type?.props?.value,
        order: "DESC",
      };
      setSortOps([
        {
          ...newSort,
        },
      ]);
    }
    if (type?.props?.value === SortKey.PRICE_MIN) {
      const newSort = {
        column: type?.props?.value,
        order: "ASC",
      };
      setSortOps([
        {
          ...newSort,
        },
      ]);
    }
  };
  useEffect(() => {
    if (!isEmpty(productList)) {
      setProducts(productList);
    }
  }, [products, productList]);
  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      filter: convertFilterParams({
        subCategoryIds: filterOps.subCategoryIds,
        colorIds: filterOps.colorIds,
        sizeIds: filterOps.sizeIds,
        minPrice: filterOps.minPrice,
        maxPrice: filterOps.maxPrice,
      }),
      sort: JSON.stringify(sortOps) || [],
      limit: 8,
    };
    dispatch(listProduct(params));
    dispatch(listCategory());
    dispatch(listColor());
    dispatch(listSize());
  };
  useEffect(() => {
    refreshData();
  }, [filterOps, sortOps, keyword, dispatch]);
  const clearFilter = () => setFilterOps(initFilter);
  const updateProducts = useCallback(() => {
    let temp = productList;
    !isEmpty(temp) ? setResultsFound(true) : setResultsFound(false);
  }, [filterOps, productList, keyword]);
  useEffect(() => {
    updateProducts();
  }, [updateProducts, productList, keyword, resultsFound]);
  const filterRef = useRef(null);
  const showHideFilter = () => filterRef.current?.classList.toggle("active");
  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__search">
            <SearchBar
              value={keyword}
              changeInput={(e) => setKeyword(e.target.value)}
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
                              handleChangeFilter(
                                "CATEGORY",
                                input.checked,
                                itemChild
                              )
                            }
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
                          handleChangeFilter("COLOR", input.checked, item)
                        }
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
                          handleChangeFilter("SIZE", input.checked, item)
                        }
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
                      onChange={(input) =>
                        handleChangeFilter("PRICE", input.checked, itemPrice)
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
              <ProductSort options={SORTS} onSort={handleSort} />
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

export default CatalogTest;
